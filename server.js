require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// === CORS Setup ===
const allowedOrigins = ['https://techsyinvesting.in']; // 🔁 Replace with your real domain
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// === Middleware ===
app.use(express.json());

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// === API Routes ===
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/live', require('./routes/live'));
app.use('/api/wallet', require('./routes/wallet'));
// app.use('/api/payments', require('./routes/payments'));

// === Test Route ===
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

// === Server Start ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

