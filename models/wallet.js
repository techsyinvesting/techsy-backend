const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
  symbol: String,
  quantity: Number,
  price: Number
});

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 100000 },
  holdings: [holdingSchema]
});

module.exports = mongoose.model('Wallet', walletSchema);