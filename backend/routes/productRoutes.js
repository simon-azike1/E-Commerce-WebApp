const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  getAllProductsAdmin,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', getProducts);
router.get('/admin/all', protect, authorize('admin'), getAllProductsAdmin);
router.get('/:id', getProduct);
router.post('/', protect, authorize('admin'), upload.array('images', 6), createProduct);
router.put('/:id', protect, authorize('admin'), upload.array('images', 6), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);
router.delete('/:id/images/:publicId', protect, authorize('admin'), deleteProductImage);

module.exports = router;