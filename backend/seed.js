require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product  = require('./models/Product');

const categories = [
  { name: 'Electronics',     slug: 'electronics',   description: 'Gadgets and electronic devices',   isActive: true },
  { name: 'Fashion',         slug: 'fashion',       description: 'Clothing and accessories',         isActive: true },
  { name: 'Home & Kitchen',  slug: 'home-kitchen',  description: 'Home and kitchen essentials',      isActive: true },
  { name: 'Health & Beauty', slug: 'health-beauty', description: 'Health, beauty and personal care', isActive: true },
];

const getProducts = (catMap) => [

  // ── Electronics ──────────────────────────────────────────────────────────
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Crystal clear sound quality perfect for music and calls.',
    price: 25000, comparePrice: 35000,
    images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', publicId: 'seed_1' }],
    category: catMap['Electronics'], stock: 50, isActive: true, isFeatured: true,
    tags: ['electronics', 'audio', 'wireless'],
  },
  {
    name: 'Smart Watch Pro',
    description: 'Feature-packed smartwatch with health monitoring, GPS tracking, and 7-day battery life. Compatible with Android and iOS.',
    price: 45000, comparePrice: 60000,
    images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', publicId: 'seed_2' }],
    category: catMap['Electronics'], stock: 30, isActive: true, isFeatured: true,
    tags: ['electronics', 'wearable', 'smartwatch'],
  },
  {
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation, touch controls and 24-hour total battery life with charging case.',
    price: 18000, comparePrice: 25000,
    images: [{ url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80', publicId: 'seed_3' }],
    category: catMap['Electronics'], stock: 80, isActive: true, isFeatured: true,
    tags: ['electronics', 'audio', 'earbuds'],
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound and 12-hour playtime. Perfect for outdoor adventures.',
    price: 15000, comparePrice: 20000,
    images: [{ url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80', publicId: 'seed_4' }],
    category: catMap['Electronics'], stock: 45, isActive: true, isFeatured: false,
    tags: ['electronics', 'audio', 'bluetooth'],
  },
  {
    name: 'Digital Camera DSLR',
    description: '24MP DSLR camera with 18-55mm lens, 4K video recording and built-in Wi-Fi. Perfect for photography beginners and enthusiasts.',
    price: 120000, comparePrice: 150000,
    images: [{ url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80', publicId: 'seed_5' }],
    category: catMap['Electronics'], stock: 20, isActive: true, isFeatured: true,
    tags: ['electronics', 'camera', 'photography'],
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant laptop backpack with USB charging port. Fits laptops up to 15.6 inches. Multiple compartments for easy organisation.',
    price: 14000, comparePrice: 19000,
    images: [{ url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', publicId: 'seed_6' }],
    category: catMap['Electronics'], stock: 60, isActive: true, isFeatured: false,
    tags: ['electronics', 'accessories', 'bag'],
  },

  // ── Fashion ───────────────────────────────────────────────────────────────
  {
    name: "Men's Casual Sneakers",
    description: 'Comfortable everyday sneakers made with breathable fabric. Available in multiple sizes. Perfect for casual and semi-formal wear.',
    price: 12000, comparePrice: 18000,
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', publicId: 'seed_7' }],
    category: catMap['Fashion'], stock: 100, isActive: true, isFeatured: true,
    tags: ['fashion', 'shoes', 'men'],
  },
  {
    name: "Women's Leather Handbag",
    description: 'Elegant leather handbag with multiple compartments. Spacious enough for everyday essentials. Available in black and brown.',
    price: 18000, comparePrice: 25000,
    images: [{ url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80', publicId: 'seed_8' }],
    category: catMap['Fashion'], stock: 60, isActive: true, isFeatured: true,
    tags: ['fashion', 'bags', 'women'],
  },
  {
    name: 'Wrist Watch Classic Gold',
    description: 'Elegant gold stainless steel wrist watch with genuine leather strap. Water resistant up to 30 metres. Suits men and women.',
    price: 22000, comparePrice: 30000,
    images: [{ url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80', publicId: 'seed_9' }],
    category: catMap['Fashion'], stock: 40, isActive: true, isFeatured: false,
    tags: ['fashion', 'accessories', 'watch'],
  },
  {
    name: "Women's Sunglasses",
    description: 'UV400 protection polarised sunglasses with lightweight frame. Suitable for driving, outdoor sports and everyday use.',
    price: 7500, comparePrice: 11000,
    images: [{ url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80', publicId: 'seed_10' }],
    category: catMap['Fashion'], stock: 85, isActive: true, isFeatured: false,
    tags: ['fashion', 'accessories', 'women'],
  },
  {
    name: "Men's Formal Shirt",
    description: 'Slim fit formal shirt made from premium cotton blend. Wrinkle-resistant fabric. Perfect for office and formal occasions.',
    price: 6500, comparePrice: 9000,
    images: [{ url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80', publicId: 'seed_11' }],
    category: catMap['Fashion'], stock: 150, isActive: true, isFeatured: false,
    tags: ['fashion', 'clothing', 'men', 'formal'],
  },
  {
    name: "Women's Running Shoes",
    description: 'Lightweight running shoes with cushioned sole and breathable mesh upper. Ideal for jogging, gym and everyday training.',
    price: 15000, comparePrice: 22000,
    images: [{ url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80', publicId: 'seed_12' }],
    category: catMap['Fashion'], stock: 90, isActive: true, isFeatured: true,
    tags: ['fashion', 'shoes', 'women', 'sports'],
  },

  // ── Home & Kitchen ────────────────────────────────────────────────────────
  {
    name: 'Non-stick Cooking Pan Set',
    description: '3-piece premium non-stick pan set. Suitable for all cooktops including induction. Easy to clean and dishwasher safe.',
    price: 8500, comparePrice: 12000,
    images: [{ url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80', publicId: 'seed_13' }],
    category: catMap['Home & Kitchen'], stock: 75, isActive: true, isFeatured: false,
    tags: ['kitchen', 'cooking', 'home'],
  },
  {
    name: 'Electric Kettle 1.8L',
    description: 'Stainless steel electric kettle with auto shut-off and boil-dry protection. Boils 1.8 litres of water in under 4 minutes.',
    price: 7200, comparePrice: 9500,
    images: [{ url: 'https://m.media-amazon.com/images/I/71zm1Qw0iML._AC_SL1000__.jpg', publicId: 'seed_14' }],
    category: catMap['Home & Kitchen'], stock: 55, isActive: true, isFeatured: false,
    tags: ['kitchen', 'appliances', 'home'],
  },
  {
    name: 'Scented Candle Set',
    description: 'Set of 3 luxury scented candles with 40-hour burn time each. Available in lavender, vanilla and sandalwood fragrances.',
    price: 5500, comparePrice: 8000,
    images: [{ url: 'https://www.colishco.com/cdn/shop/files/LILLY.png?v=1719908086', publicId: 'seed_15' }],
    category: catMap['Home & Kitchen'], stock: 90, isActive: true, isFeatured: false,
    tags: ['home', 'decor', 'candles'],
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic coffee mugs. Microwave and dishwasher safe. Each mug holds 350ml.',
    price: 4800, comparePrice: 7000,
    images: [{ url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80', publicId: 'seed_16' }],
    category: catMap['Home & Kitchen'], stock: 110, isActive: true, isFeatured: false,
    tags: ['kitchen', 'mugs', 'home'],
  },
  {
    name: 'Bedsheet Set King Size',
    description: 'Luxury 100% cotton bedsheet set with 2 pillowcases. Soft, breathable and machine washable. Available in 5 colours.',
    price: 9800, comparePrice: 14000,
    images: [{ url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80', publicId: 'seed_17' }],
    category: catMap['Home & Kitchen'], stock: 80, isActive: true, isFeatured: false,
    tags: ['home', 'bedroom', 'bedding'],
  },
  {
    name: 'Indoor Plant Pot Set',
    description: 'Set of 3 modern ceramic plant pots with drainage holes. Perfect for succulents, herbs and small indoor plants.',
    price: 6000, comparePrice: 8500,
    images: [{ url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80', publicId: 'seed_18' }],
    category: catMap['Home & Kitchen'], stock: 70, isActive: true, isFeatured: false,
    tags: ['home', 'decor', 'plants'],
  },

  // ── Health & Beauty ───────────────────────────────────────────────────────
  {
    name: 'Vitamin C Face Serum',
    description: 'Brightening vitamin C serum with hyaluronic acid. Reduces dark spots, evens skin tone and boosts collagen production. Suitable for all skin types.',
    price: 5500, comparePrice: 8000,
    images: [{ url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80', publicId: 'seed_19' }],
    category: catMap['Health & Beauty'], stock: 90, isActive: true, isFeatured: true,
    tags: ['beauty', 'skincare', 'serum'],
  },
  {
    name: 'Perfume Gift Set',
    description: 'Luxury perfume gift set with 3 fragrances — floral, woody and fresh. Long-lasting scent up to 8 hours. Perfect for gifting.',
    price: 13500, comparePrice: 18000,
    images: [{ url: 'https://images-na.ssl-images-amazon.com/images/I/41Kpg91XXDL._SL500_._AC_SL500_.jpg', publicId: 'seed_20' }],
    category: catMap['Health & Beauty'], stock: 45, isActive: true, isFeatured: true,
    tags: ['beauty', 'fragrance', 'gift'],
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick 6mm non-slip yoga mat with carrying strap. Eco-friendly material, sweat-resistant and easy to clean.',
    price: 8000, comparePrice: 12000,
    images: [{ url: 'https://cdn.thewirecutter.com/wp-content/media/2024/07/yoga-mat-2048px-1629-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024', publicId: 'seed_21' }],
    category: catMap['Health & Beauty'], stock: 50, isActive: true, isFeatured: false,
    tags: ['health', 'fitness', 'yoga'],
  },
  {
    name: 'Hair Dryer Professional',
    description: '2200W professional hair dryer with ionic technology. 3 heat settings, 2 speed settings and cool shot button for long-lasting style.',
    price: 9500, comparePrice: 14000,
    images: [{ url: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&q=80', publicId: 'seed_22' }],
    category: catMap['Health & Beauty'], stock: 55, isActive: true, isFeatured: false,
    tags: ['beauty', 'hair', 'appliances'],
  },
  {
    name: 'Face Moisturiser SPF50',
    description: 'Daily face moisturiser with SPF50 sun protection. Lightweight, non-greasy formula that hydrates and protects all day.',
    price: 6800, comparePrice: 9500,
    images: [{ url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80', publicId: 'seed_23' }],
    category: catMap['Health & Beauty'], stock: 70, isActive: true, isFeatured: false,
    tags: ['beauty', 'skincare', 'moisturiser'],
  },
  {
    name: 'Electric Toothbrush',
    description: 'Rechargeable electric toothbrush with 3 cleaning modes and built-in 2-minute timer. Removes 5x more plaque than manual brushing.',
    price: 11000, comparePrice: 15000,
    images: [{ url: 'https://cdn11.bigcommerce.com/s-2idmiil7bp/images/stencil/1280x1280/products/1306/10304/761082_ThePub_Oral-B_Table-Top_iO5-SH03_National-Black_x3_ML_SIMP__39047__00272.1766466677.jpg?c=1', publicId: 'seed_24' }],
    category: catMap['Health & Beauty'], stock: 65, isActive: true, isFeatured: false,
    tags: ['health', 'dental', 'electric'],
  },






  // ── More Electronics ─────────────────────────────────────────────────────
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Slim design and LED indicator.',
    price: 9000, comparePrice: 12000,
    images: [{ url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&q=80', publicId: 'seed_25' }],
    category: catMap['Electronics'], stock: 70, isActive: true, isFeatured: false,
    tags: ['electronics', 'charger', 'wireless'],
  },
  {
    name: 'Gaming Mouse RGB',
    description: 'High precision gaming mouse with RGB lighting and adjustable DPI up to 16000.',
    price: 7500, comparePrice: 10000,
    images: [{ url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80', publicId: 'seed_26' }],
    category: catMap['Electronics'], stock: 80, isActive: true, isFeatured: false,
    tags: ['electronics', 'gaming', 'mouse'],
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches. Perfect for gaming and productivity.',
    price: 16000, comparePrice: 21000,
    images: [{ url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80', publicId: 'seed_27' }],
    category: catMap['Electronics'], stock: 40, isActive: true, isFeatured: false,
    tags: ['electronics', 'keyboard', 'gaming'],
  },
  {
    name: 'USB-C Hub Adapter',
    description: 'Multiport USB-C hub with HDMI, USB 3.0, SD card reader and PD charging support.',
    price: 9500, comparePrice: 13000,
    images: [{ url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80', publicId: 'seed_28' }],
    category: catMap['Electronics'], stock: 65, isActive: true, isFeatured: false,
    tags: ['electronics', 'adapter', 'usb'],
  },

  // ── More Fashion ─────────────────────────────────────────────────────────
  {
    name: "Men's Denim Jacket",
    description: 'Classic blue denim jacket made with durable cotton denim. Perfect for casual outfits.',
    price: 17000, comparePrice: 23000,
    images: [{ url: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=500&q=80', publicId: 'seed_29' }],
    category: catMap['Fashion'], stock: 60, isActive: true, isFeatured: false,
    tags: ['fashion', 'men', 'jacket'],
  },
  {
    name: "Women's Summer Dress",
    description: 'Lightweight floral summer dress made with breathable fabric. Comfortable and stylish.',
    price: 14000, comparePrice: 19000,
    images: [{ url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80', publicId: 'seed_30' }],
    category: catMap['Fashion'], stock: 70, isActive: true, isFeatured: false,
    tags: ['fashion', 'women', 'dress'],
  },
  {
    name: 'Leather Belt Classic',
    description: 'Premium genuine leather belt with metal buckle. Adjustable and durable.',
    price: 5000, comparePrice: 7500,
    images: [{ url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&q=80', publicId: 'seed_31' }],
    category: catMap['Fashion'], stock: 120, isActive: true, isFeatured: false,
    tags: ['fashion', 'accessories', 'belt'],
  },
  {
    name: 'Unisex Hoodie',
    description: 'Comfortable cotton hoodie with front pocket and adjustable hood. Perfect for winter.',
    price: 11000, comparePrice: 15000,
    images: [{ url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80', publicId: 'seed_32' }],
    category: catMap['Fashion'], stock: 90, isActive: true, isFeatured: false,
    tags: ['fashion', 'hoodie', 'clothing'],
  },

  // ── More Home & Kitchen ───────────────────────────────────────────────────
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with touch controls and multiple brightness levels.',
    price: 6200, comparePrice: 8500,
    images: [{ url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80', publicId: 'seed_33' }],
    category: catMap['Home & Kitchen'], stock: 85, isActive: true, isFeatured: false,
    tags: ['home', 'lamp', 'lighting'],
  },
  {
    name: 'Wall Clock Modern',
    description: 'Minimalist wall clock with silent movement and modern design.',
    price: 4500, comparePrice: 6500,
    images: [{ url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80', publicId: 'seed_34' }],
    category: catMap['Home & Kitchen'], stock: 100, isActive: true, isFeatured: false,
    tags: ['home', 'clock', 'decor'],
  },
  {
    name: 'Food Storage Containers',
    description: 'Set of 5 airtight food storage containers. BPA-free and stackable.',
    price: 5200, comparePrice: 7200,
    images: [{ url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80', publicId: 'seed_35' }],
    category: catMap['Home & Kitchen'], stock: 95, isActive: true, isFeatured: false,
    tags: ['kitchen', 'storage', 'containers'],
  },
  {
    name: 'Kitchen Knife Set',
    description: 'Professional 5-piece stainless steel kitchen knife set with ergonomic handles.',
    price: 12500, comparePrice: 17000,
    images: [{ url: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=500&q=80', publicId: 'seed_36' }],
    category: catMap['Home & Kitchen'], stock: 40, isActive: true, isFeatured: false,
    tags: ['kitchen', 'knife', 'cooking'],
  },

  // ── More Health & Beauty ──────────────────────────────────────────────────
  {
    name: 'Protein Shaker Bottle',
    description: 'Leak-proof protein shaker bottle with mixing ball. Perfect for gym and workouts.',
    price: 3000, comparePrice: 4500,
    images: [{ url: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&q=80', publicId: 'seed_37' }],
    category: catMap['Health & Beauty'], stock: 120, isActive: true, isFeatured: false,
    tags: ['fitness', 'gym', 'shaker'],
  },
  {
    name: 'Foam Roller',
    description: 'High-density foam roller for muscle recovery and physiotherapy.',
    price: 4800, comparePrice: 7000,
    images: [{ url: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=500&q=80', publicId: 'seed_38' }],
    category: catMap['Health & Beauty'], stock: 75, isActive: true, isFeatured: false,
    tags: ['fitness', 'recovery', 'foam'],
  },
  {
    name: 'Facial Cleansing Brush',
    description: 'Electric facial cleansing brush with soft bristles for deep pore cleaning.',
    price: 6500, comparePrice: 9000,
    images: [{ url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80', publicId: 'seed_39' }],
    category: catMap['Health & Beauty'], stock: 65, isActive: true, isFeatured: false,
    tags: ['beauty', 'skincare', 'cleanser'],
  },
  {
    name: 'Massage Gun',
    description: 'Portable muscle massage gun with multiple speed levels and interchangeable heads.',
    price: 22000, comparePrice: 28000,
    images: [{ url: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500&q=80', publicId: 'seed_40' }],
    category: catMap['Health & Beauty'], stock: 35, isActive: true, isFeatured: true,
    tags: ['fitness', 'massage', 'recovery'],
  },






];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅  MongoDB connected');

    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️   Cleared existing data');

    const insertedCategories = await Category.insertMany(categories);
    console.log(`📦  Inserted ${insertedCategories.length} categories`);

    const catMap = {};
    insertedCategories.forEach((cat) => { catMap[cat.name] = cat._id; });

    const products = getProducts(catMap);
    const insertedProducts = await Product.insertMany(products);
    console.log(`🛍️   Inserted ${insertedProducts.length} products`);

    console.log('\n🎉  Database seeded successfully!');
    console.log('────────────────────────────────────────');
    insertedCategories.forEach((c) => console.log(`   ✔ Category: ${c.name}`));
    console.log(`   ✔ Products inserted: ${insertedProducts.length}`);
    console.log('────────────────────────────────────────');
    process.exit(0);
  } catch (error) {
    console.error('❌  Seed error:', error.message);
    process.exit(1);
  }
};

seed();