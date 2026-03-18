const DeliveryAgent = require('../models/DeliveryAgent');
const { asyncHandler } = require('../middleware/error');

// @route   GET /api/delivery/agents
const getAgents = asyncHandler(async (req, res) => {
  const agents = await DeliveryAgent.find({ isActive: true }).sort('name');
  res.json({ success: true, agents });
});

// @route   POST /api/delivery/agents
const createAgent = asyncHandler(async (req, res) => {
  if (process.env.DELIVERY_ENABLED !== 'true') {
    return res.status(403).json({ success: false, message: 'Delivery feature is not enabled' });
  }
  const agent = await DeliveryAgent.create(req.body);
  res.status(201).json({ success: true, agent });
});

// @route   PUT /api/delivery/agents/:id
const updateAgent = asyncHandler(async (req, res) => {
  const agent = await DeliveryAgent.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
  res.json({ success: true, agent });
});

// @route   DELETE /api/delivery/agents/:id
const deleteAgent = asyncHandler(async (req, res) => {
  await DeliveryAgent.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ success: true, message: 'Agent removed' });
});

module.exports = { getAgents, createAgent, updateAgent, deleteAgent };