const buildWhatsAppMessage = (order) => {
  const storeNumber = process.env.STORE_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '212751780853';
  
  // Items with image links
  const itemLines = order.items.map((item, index) => {
    const itemBlock = `*Item ${index + 1}:* ${item.name}
Qty: ${item.quantity} | Unit: N${item.price.toLocaleString()} | Total: N${(item.price * item.quantity).toLocaleString()}`;
    
    if (item.image) {
      return `${itemBlock}\nImage: ${item.image}`;
    }
    return itemBlock;
  }).join('\n\n');
 
  const deliveryInfo = order.fulfillmentType === 'delivery' 
    ? `*Delivery Address:*\n${order.deliveryAddress.street || ''}, ${order.deliveryAddress.city || ''}${order.deliveryAddress.state ? ', ' + order.deliveryAddress.state : ''}`
    : '*Store Pickup*';
 
  const message = `*NEW ORDER RECEIVED*\n\n` +
    `*Order Number:* ${order.orderNumber}\n` +
    `*Total Amount:* N${order.total.toLocaleString()}\n\n` +
    `*CUSTOMER DETAILS*\n` +
    `Name: ${order.customer.name}\n` +
    `Phone: ${order.customer.phone}\n` +
    `${order.customer.email ? `Email: ${order.customer.email}\n` : ''}\n\n` +
    `*ORDER ITEMS* (${order.items.length})\n` +
    `${itemLines}\n\n` +
    `*Payment:* Pending\n` +
    `${deliveryInfo}\n\n` +
    `${order.customerNote ? `*Customer Notes:*\n${order.customerNote}\n\n` : ''}` +
    `*NEXT STEPS:*\n` +
    `1. Confirm order availability\n` +
    `2. Contact customer for payment/delivery\n` +
    `3. Update status in admin panel\n\n` +
    `Thank you!`;
 
  const encoded = encodeURIComponent(message);
  const waLink = `https://wa.me/${storeNumber}?text=${encoded}`;
  console.log('WA Link:', waLink.substring(0, 100) + '...');
  return waLink;
};

module.exports = { buildWhatsAppMessage };
