const express = require('express');
const router = express.Router();
const {
  getAgents,
  createAgent,
  updateAgent,
  deleteAgent,
} = require('../controllers/deliveryController');
const { protect, authorize } = require('../middleware/auth');

// All delivery routes are admin-only
router.get('/agents', protect, authorize('admin'), getAgents);
router.post('/agents', protect, authorize('admin'), createAgent);
router.put('/agents/:id', protect, authorize('admin'), updateAgent);
router.delete('/agents/:id', protect, authorize('admin'), deleteAgent);

module.exports = router;