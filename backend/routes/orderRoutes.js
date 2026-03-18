const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  assignAgent,
  getAgentOrders,
  exportOrdersCSV,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', placeOrder);
router.get('/my-deliveries', protect, authorize('agent'), getAgentOrders);
router.get('/', protect, authorize('admin'), getOrders);
router.get('/export', protect, authorize('admin'), exportOrdersCSV);
router.get('/:id', protect, authorize('admin'), getOrder);
router.patch('/:id/status', protect, authorize('admin'), updateOrderStatus);
router.patch('/:id/assign', protect, authorize('admin'), assignAgent);

module.exports = router;
