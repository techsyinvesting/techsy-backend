const Wallet = require('../models/wallet');

exports.getWallet = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ user: req.user.id });
    
    if (!wallet) {
      // Initialize wallet if not exists
      wallet = new Wallet({ user: req.user.id });
      await wallet.save();
    }
    
    res.json(wallet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.buyStock = async (req, res) => {
  const { symbol, quantity, price } = req.body;
  const totalCost = quantity * price;

  try {
    let wallet = await Wallet.findOne({ user: req.user.id });
    
    if (!wallet) {
      wallet = new Wallet({ user: req.user.id });
    }

    if (wallet.balance < totalCost) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update balance
    wallet.balance -= totalCost;

    // Update holdings
    const existingHolding = wallet.holdings.find(h => h.symbol === symbol);
    if (existingHolding) {
      // Update existing holding
      const totalQuantity = existingHolding.quantity + quantity;
      const totalValue = existingHolding.quantity * existingHolding.price + totalCost;
      existingHolding.price = totalValue / totalQuantity;
      existingHolding.quantity = totalQuantity;
    } else {
      // Add new holding
      wallet.holdings.push({ symbol, quantity, price });
    }

    await wallet.save();
    res.json(wallet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.sellStock = async (req, res) => {
  const { symbol, quantity, price } = req.body;
  const totalSale = quantity * price;

  try {
    const wallet = await Wallet.findOne({ user: req.user.id });
    
    if (!wallet) {
      return res.status(400).json({ message: 'Wallet not found' });
    }

    const holding = wallet.holdings.find(h => h.symbol === symbol);
    if (!holding) {
      return res.status(400).json({ message: 'Holding not found' });
    }

    if (holding.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient quantity' });
    }

    // Update balance
    wallet.balance += totalSale;

    // Update holdings
    holding.quantity -= quantity;
    if (holding.quantity === 0) {
      wallet.holdings = wallet.holdings.filter(h => h.symbol !== symbol);
    }

    await wallet.save();
    res.json(wallet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};