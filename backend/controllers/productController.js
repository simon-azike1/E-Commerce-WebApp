const Product = require('../models/Product');
const { cloudinary } = require('../config/cloudinary');
const { asyncHandler } = require('../middleware/error');

// @route   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const { category, search, featured, page = 1, limit = 12, sort = '-createdAt' } = req.query;

  const query = { isActive: true };
  if (category) query.category = category;
  if (featured === 'true') query.isFeatured = true;
  if (search) query.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(query),
  ]);

  res.json({
    success: true,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    products,
  });
});

// @route   GET /api/products/:id
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name slug');
  if (!product || !product.isActive) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

// @route   GET /api/products/admin/all
const getAllProductsAdmin = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('category', 'name').sort('-createdAt');
  res.json({ success: true, count: products.length, products });
});

// @route   POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  console.log('=== CREATE PRODUCT DEBUG ===');
  console.log('Body keys:', Object.keys(req.body));
  console.log('Files:', req.files ? req.files.map(f => ({fieldname: f.fieldname, originalname: f.originalname, path: f.path, filename: f.filename })) : 'No files');
  console.log('imageUrl from body:', req.body.imageUrl);
  
  const { name, description, price, comparePrice, category, stock, isFeatured, tags, imageUrl } = req.body;

  let images = [];
  if (req.files && req.files.length > 0) {
    console.log('Using uploaded files');
    images = req.files.map((f) => ({ url: f.path, publicId: f.filename }));
  } else if (imageUrl) {
    console.log('Using imageUrl:', imageUrl);
    images = [{ url: imageUrl }];
  } else {
    console.log('No images or URL');
    return res.status(400).json({ success: false, message: 'At least one image or image URL is required' });
  }

  const product = await Product.create({
    name,
    description,
    price,
    comparePrice,
    category,
    stock,
    isFeatured,
    tags: tags ? JSON.parse(tags) : [],
    images,
  });

  console.log('Product created:', product._id);
  console.log('=== END DEBUG ===');

  res.status(201).json({ success: true, product });
});

// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  console.log('=== UPDATE PRODUCT DEBUG ===');
  console.log('Files:', req.files ? req.files.length : 'No files');
  console.log('imageUrl:', req.body.imageUrl);
  
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  const updates = { ...req.body };
  if (updates.tags && typeof updates.tags === 'string') {
    updates.tags = JSON.parse(updates.tags);
  }

  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((f) => ({ url: f.path, publicId: f.filename }));
    updates.images = [...product.images, ...newImages];
  } else if (req.body.imageUrl && !req.files) {
    // Replace first image with URL if no files uploaded
    product.images[0] = { url: req.body.imageUrl };
    updates.images = product.images;
  }

  const updated = await Product.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, product: updated });
  console.log('=== END DEBUG ===');
});

// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Product removed from storefront' });
});

// @route   DELETE /api/products/:id/images/:publicId
const deleteProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  const publicId = decodeURIComponent(req.params.publicId);
  await cloudinary.uploader.destroy(publicId);

  product.images = product.images.filter((img) => img.publicId !== publicId);
  await product.save();

  res.json({ success: true, message: 'Image deleted', product });
});

module.exports = {
  getProducts,
  getProduct,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
};
