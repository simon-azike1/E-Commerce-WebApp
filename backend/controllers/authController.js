const jwt  = require('jsonwebtoken');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/error');

const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  });

const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });

// @route   POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }

  const user = await User.create({ name, email, password, phone });
  const accessToken  = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Use updateOne instead of save to avoid triggering pre-save hook
  await User.updateOne({ _id: user._id }, { refreshToken });

  res.status(201).json({
    success: true,
    accessToken,
    refreshToken,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @route   POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  if (!user.isActive) {
    return res.status(403).json({ success: false, message: 'Account is disabled' });
  }

  const accessToken  = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Use updateOne instead of save to avoid triggering pre-save hook
  await User.updateOne({ _id: user._id }, { refreshToken });

  res.json({
    success: true,
    accessToken,
    refreshToken,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @route   POST /api/auth/refresh
const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token required' });
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user    = await User.findById(decoded.id).select('+refreshToken');

  if (!user || user.refreshToken !== refreshToken) {
    return res.status(403).json({ success: false, message: 'Invalid refresh token' });
  }

  const newAccessToken = generateAccessToken(user._id);
  res.json({ success: true, accessToken: newAccessToken });
});

// @route   POST /api/auth/logout
const logout = asyncHandler(async (req, res) => {
  await User.updateOne({ _id: req.user._id }, { refreshToken: null });
  res.json({ success: true, message: 'Logged out' });
});

// @route   GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = { register, login, refresh, logout, getMe };