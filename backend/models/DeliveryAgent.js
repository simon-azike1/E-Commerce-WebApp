const mongoose = require('mongoose');

const deliveryAgentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    // Optional link to a user account (if agent logs into the portal)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    zone: {
      // delivery coverage area — free text for now (e.g. "Lagos Island", "Lekki")
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    totalDeliveries: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DeliveryAgent', deliveryAgentSchema);