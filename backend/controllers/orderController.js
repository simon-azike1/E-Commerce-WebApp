const Order = require('../models/Order');
const Product = require('../models/Product');
const { asyncHandler } = require('../middleware/error');
const { buildWhatsAppMessage } = require('../services/whatsapp/waMessage');

// @route   POST /api/orders
const placeOrder = asyncHandler(async (req, res) => {
  const body = req.body || {};
  const { customer, items, fulfillmentType, deliveryAddress, customerNote } = body;

  if (!customer || !customer.name?.trim() || !customer.phone?.trim()) {
    return res.status(400).json({ success: false, message: 'Customer name and phone are required' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
  }

  if (!['pickup', 'delivery'].includes(fulfillmentType)) {
    return res.status(400).json({ success: false, message: 'Fulfillment type must be pickup or delivery' });
  }

  if (fulfillmentType === 'delivery') {
    const hasAddress = deliveryAddress && deliveryAddress.street && deliveryAddress.street.trim();
    if (!hasAddress) {
      return res
        .status(400)
        .json({ success: false, message: 'A street address is required for delivery orders' });
    }
  }

  const orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    if (!item.productId) {
      return res.status(400).json({ success: false, message: 'Each item must include a productId' });
    }

    const quantity = Number(item.quantity) || 0;
    if (quantity < 1) {
      return res.status(400).json({ success: false, message: 'Each item must request at least one unit' });
    }

    const product = await Product.findById(item.productId);
    if (!product || !product.isActive) {
      return res.status(400).json({
        success: false,
        message: `Product not found or unavailable: ${item.productId}`,
      });
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || '',
      quantity,
    });

    subtotal += product.price * quantity;
  }

  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const order = await Order.create({
    customer: {
      userId: req.user?._id || null,
      name: customer.name,
      phone: customer.phone,
      email: customer.email || '',
    },
    items: orderItems,
    subtotal,
    deliveryFee,
    total,
    fulfillmentType,
    deliveryAddress: fulfillmentType === 'delivery' ? deliveryAddress : undefined,
    customerNote,
  });

  const waLink = buildWhatsAppMessage(order);

  res.status(201).json({
    success: true,
    order: {
      _id: order._id,
      orderNumber: order.orderNumber,
      total: order.total,
      status: order.status,
      fulfillmentType: order.fulfillmentType,
    },
    waLink,
  });
});

// @route   GET /api/orders
const getOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const query = {};
  if (status) query.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [orders, total] = await Promise.all([
    Order.find(query)
      .populate('assignedAgent', 'name phone')
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit)),
    Order.countDocuments(query),
  ]);

  res.json({
    success: true,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    orders,
  });
});

// @route   GET /api/orders/:id
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('assignedAgent', 'name phone zone');
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, order });
});

// @route   PATCH /api/orders/:id/status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;
  const validStatuses = ['pending', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status, ...(notes && { notes }) },
    { new: true }
  );

  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, order });
});

// @route   PATCH /api/orders/:id/assign
const assignAgent = asyncHandler(async (req, res) => {
  if (process.env.DELIVERY_ENABLED !== 'true') {
    return res.status(403).json({ success: false, message: 'Delivery feature is not enabled' });
  }

  const { agentId } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { assignedAgent: agentId, status: 'processing' },
    { new: true }
  ).populate('assignedAgent', 'name phone');

  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, order });
});

// @route   GET /api/orders/my-deliveries
const getAgentOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ assignedAgent: req.user._id }).sort('-createdAt');
  res.json({ success: true, count: orders.length, orders });
});

// @route   GET /api/orders/export
const exportOrdersCSV = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const query = {};
  if (status) query.status = status;

  const orders = await Order.find(query)
    .populate('assignedAgent', 'name phone')
    .sort('-createdAt')
    .lean();

  const headers = 'Order#,Customer,Phone,Items,Total,Status,Type,Date,Notes\\n';
  
  const csvRows = orders.map(order => [
    order.orderNumber,
    order.customer?.name || '',
    order.customer?.phone || '',
    order.items?.length || 0,
    order.total || 0,
    order.status,
    order.fulfillmentType,
    new Date(order.createdAt).toISOString().split('T')[0],
    order.notes || ''
  ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(','));

  const csv = headers + csvRows.join('\\n');
  
  res.set({
    'Content-Type': 'text/csv',
  });
  
  res.send(csv);
});

module.exports = {
  placeOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  assignAgent,
  getAgentOrders,
  exportOrdersCSV,
};
