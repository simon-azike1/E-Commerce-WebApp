require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');

// ADD THESE LINES TEMPORARILY
console.log('auth:',     typeof authRoutes);
console.log('products:', typeof productRoutes);
console.log('orders:',   typeof orderRoutes);
console.log('categories:', typeof categoryRoutes);
console.log('delivery:', typeof deliveryRoutes);

const app = express();

// ─── Connect Database ────────────────────────────────────────────────────────
connectDB();

// ─── Security Middleware ─────────────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: ['http://localhost:5173', process.env.CLIENT_URL].filter(Boolean),
    credentials: true,
  })
);

// Rate limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later' },
});
app.use('/api', limiter);

// Stricter limit on auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts, please try again later' },
});
app.use('/api/auth', authLimiter);

// ─── Body Parser ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Logger (dev only) ───────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    env: process.env.NODE_ENV,
    features: {
      payment: process.env.PAYMENT_ENABLED === 'true',
      delivery: process.env.DELIVERY_ENABLED === 'true',
    },
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/delivery', deliveryRoutes);

// ─── Payment Module (isolated — only mounted when enabled) ───────────────────
if (process.env.PAYMENT_ENABLED === 'true') {
  const paymentRoutes = require('./routes/paymentRoutes');
  app.use('/api/payment', paymentRoutes);
  console.log('💳  Payment module: ENABLED');
} else {
  console.log('💳  Payment module: DISABLED (set PAYMENT_ENABLED=true to activate)');
}

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
console.log('Store WhatsApp:', process.env.STORE_WHATSAPP_NUMBER || 'MISSING');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\\n🚀  Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📦  Delivery module: ${process.env.DELIVERY_ENABLED === 'true' ? 'ENABLED' : 'DISABLED'}`);
  console.log('WA number loaded:', process.env.STORE_WHATSAPP_NUMBER || 'MISSING');
});

