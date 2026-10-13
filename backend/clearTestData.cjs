require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Order = require('./models/Order');

// The one real seeded product to keep
const KEEP_NAME = 'Hand-Painted Ceramic Rectangular Sushi & Appetizer Platters (Set of 3)';

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const all = await Product.find({}).select('name');
  const toDelete = all.filter((p) => p.name !== KEEP_NAME);
  console.log(`Deleting ${toDelete.length} of ${all.length} products (keeping: ${KEEP_NAME})`);
  console.log('Removing:', toDelete.map((p) => p.name).join(', '));

  const productResult = await Product.deleteMany({ _id: { $in: toDelete.map((p) => p._id) } });
  console.log(`Products hard-deleted: ${productResult.deletedCount}`);

  const orderCount = await Order.countDocuments();
  const orderResult = await Order.deleteMany({});
  console.log(`Orders cleared: ${orderResult.deletedCount} of ${orderCount}`);

  const remaining = await Product.find({}).select('name isActive currency price');
  console.log(`\nRemaining products (${remaining.length}):`);
  remaining.forEach((p) => console.log(` - ${p.name} | active=${p.isActive} | ${p.currency} ${p.price}`));

  await mongoose.disconnect();
  console.log('Done.');
};

run().catch((e) => { console.error('Error:', e.message); process.exit(1); });
