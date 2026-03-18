import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Upload, X, Plus, Save, Image, Tag, DollarSign, Package, Eye, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { createProduct, updateProduct, getAdminProducts, getCategories, deleteProductImage } from '../../api/index';
import { Spinner } from '../../components/ui/AdminUI';
import toast from 'react-hot-toast';

const EMPTY = {
  name: '', description: '', price: '', comparePrice: '',
  category: '', stock: '', isFeatured: false, isActive: true, tags: '',
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay },
});

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [deletingImage, setDeletingImage] = useState(null);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    getCategories().then((r) => setCategories(r.data.categories));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    getAdminProducts().then((r) => {
      const product = r.data.products.find((p) => p._id === id);
      if (!product) { toast.error('Product not found'); navigate('/admin/products'); return; }
      setForm({
        name: product.name || '', description: product.description || '',
        price: product.price || '', comparePrice: product.comparePrice || '',
        category: product.category?._id || '', stock: product.stock ?? '',
        isFeatured: product.isFeatured || false, isActive: product.isActive ?? true,
        tags: (product.tags || []).join(', '),
      });
      setImages((product.images || []).map((img) => ({ url: img.url, publicId: img.publicId, preview: img.url })));
      setImageUrl(product.images?.[0]?.url || '');
      setLoading(false);
    });
  }, [id, isEdit, navigate]);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImages].slice(0, 6));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    const newImages = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImages].slice(0, 6));
  };

  const removeImage = async (index, publicId) => {
    if (publicId && isEdit) {
      try {
        setDeletingImage(index);
        await deleteProductImage(id, publicId);
        toast.success('Image deleted');
      } catch (err) {
        toast.error('Failed to delete image');
        return;
      } finally {
        setDeletingImage(null);
      }
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category || !form.stock) {
      toast.error('Name, price, category and stock are required');
      return;
    }
    if (images.length === 0 && !imageUrl) {
      toast.error('Please add at least one product image or image URL');
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'tags') formData.append('tags', JSON.stringify(v.split(',').map((t) => t.trim()).filter(Boolean)));
        else formData.append(k, v);
      });
      images.forEach((img) => { if (img.file) formData.append('images', img.file); });
      if (imageUrl) formData.append('imageUrl', imageUrl);
      if (isEdit) { await updateProduct(id, formData); toast.success('Product updated successfully'); }
      else { await createProduct(formData); toast.success('Product created successfully'); }
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally { setSaving(false); }
  };

  const discount = form.comparePrice && Number(form.comparePrice) > Number(form.price)
    ? Math.round(((form.comparePrice - form.price) / form.comparePrice) * 100)
    : 0;

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Tag },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'images', label: 'Images', icon: Image },
    { id: 'organization', label: 'Organization', icon: Package },
  ];

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Spinner size={40} />
        <p className="text-gray-500 text-sm mt-4">Loading product data...</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/products" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              <motion.div animate={{ x: [-3, 0, -3] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronLeft size={20} />
              </motion.div>
              Back to Products
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 border border-gray-200">
              <div className={`w-3 h-3 rounded-full ${isEdit ? 'bg-amber-500' : 'bg-green-500'}`} />
              <span className="text-sm font-medium text-gray-700">
                {isEdit ? 'Editing Product' : 'Creating New Product'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isEdit ? 'Update product information and details' : 'Fill in the details to add a new product to your store'}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div {...fadeUp(0.15)} className="bg-white border border-gray-200 rounded-2xl p-2 overflow-x-auto">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === 'basic' && (
                <motion.div key="basic" {...fadeUp(0.2)} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Tag size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">Basic Information</h2>
                      <p className="text-xs text-gray-500">Core product details</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        <Tag size={14} />
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Wireless Bluetooth Headphones" className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        <Package size={14} />
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea required rows={5} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe the product features, specifications, and benefits..." className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 resize-none" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        <Tag size={14} />
                        Tags (comma separated)
                      </label>
                      <input type="text" value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="e.g. electronics, audio, wireless, bluetooth" className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300" />
                      <p className="text-xs text-gray-400 mt-1.5">Used for search and filtering</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'pricing' && (
                <motion.div key="pricing" {...fadeUp(0.2)} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <DollarSign size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">Pricing</h2>
                      <p className="text-xs text-gray-500">Set product price and discounts</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        <DollarSign size={14} />
                        Price (₦) <span className="text-red-500">*</span>
                      </label>
                      <input type="number" required min="0" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="25000" className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        <DollarSign size={14} />
                        Compare Price (₦)
                      </label>
                      <input type="number" min="0" value={form.comparePrice} onChange={(e) => set('comparePrice', e.target.value)} placeholder="35000" className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300" />
                      <p className="text-xs text-gray-400 mt-1.5">Original price for discount display</p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {discount > 0 && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-5 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle size={16} className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-green-800">Discount Applied</p>
                            <p className="text-xs text-green-600">You're offering {discount}% off — customers will see the original price crossed out</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {activeTab === 'images' && (
                <motion.div key="images" {...fadeUp(0.2)} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Image size={20} className="text-purple-500" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">Product Images</h2>
                      <p className="text-xs text-gray-500">Add up to 6 images or use URL (first image is main)</p>
                    </div>
                  </div>

                  <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`mb-6 border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${dragOver ? 'bg-blue-500' : 'bg-gray-100'}`}>
                        <Upload size={28} className={dragOver ? 'text-white' : 'text-gray-400'} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{dragOver ? 'Drop images here' : 'Drag and drop images here'}</p>
                        <p className="text-xs text-gray-500 mt-1">or click to browse files</p>
                      </div>
                      <label className="mt-2">
                        <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
                        <span className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors cursor-pointer">
                          <Upload size={16} />
                          Browse Files
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Or enter direct image URL
                    </label>
                    <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300" />
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                      <AnimatePresence>
                        {images.map((img, i) => (
                          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group">
                            <img src={img.preview || img.url} alt="" className="w-full h-full object-cover" />
                            {i === 0 && <span className="absolute bottom-2 left-2 text-[10px] bg-blue-500 text-white px-2 py-1 rounded-full font-semibold">Main</span>}
                            <motion.button type="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => removeImage(i, img.publicId)} disabled={deletingImage === i} className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg disabled:opacity-50">
                              {deletingImage === i ? <Spinner size={12} /> : <X size={14} />}
                            </motion.button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {images.length < 6 && (
                        <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-500 bg-gray-50 hover:bg-blue-50">
                          <Plus size={24} />
                          <span className="text-xs font-medium">Add Image</span>
                          <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
                        </label>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mt-4">
                    {images.length}/6 images used • Supported formats: JPG, PNG, WebP • URL works for external/remote images
                  </p>
                </motion.div>
              )}

              {activeTab === 'organization' && (
                <motion.div key="organization" {...fadeUp(0.2)} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Package size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">Organization</h2>
                      <p className="text-xs text-gray-500">Category, stock, and visibility settings</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        <Package size={14} />
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select required value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 bg-white">
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        <Package size={14} />
                        Stock Quantity <span className="text-red-500">*</span>
                      </label>
                      <input type="number" required min="0" value={form.stock} onChange={(e) => set('stock', e.target.value)} placeholder="0" className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300" />
                      <p className="text-xs text-gray-400 mt-1.5">Number of items available for sale</p>
                    </div>
                    <div className="border-t border-gray-200 pt-5 mt-2">
                      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Eye size={16} />
                        Visibility Settings
                      </h3>
                      <div className="flex flex-col gap-4">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${form.isActive ? 'bg-green-500' : 'bg-gray-200'}`}>
                              <Eye size={18} className="text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Show in Storefront</p>
                              <p className="text-xs text-gray-500">Customers can see and purchase this product</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} className="sr-only" />
                            <motion.div animate={{ backgroundColor: form.isActive ? '#22c55e' : '#e5e7eb' }} className="w-12 h-6 rounded-full">
                              <motion.div animate={{ x: form.isActive ? 24 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-md" />
                            </motion.div>
                          </div>
                        </label>
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${form.isFeatured ? 'bg-amber-500' : 'bg-gray-200'}`}>
                              <Tag size={18} className="text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Featured Product</p>
                              <p className="text-xs text-gray-500">Show on the home page featured section</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} className="sr-only" />
                            <motion.div animate={{ backgroundColor: form.isFeatured ? '#f59e0b' : '#e5e7eb' }} className="w-12 h-6 rounded-full">
                              <motion.div animate={{ x: form.isFeatured ? 24 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-md" />
                            </motion.div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Save Card */}
          <div className="flex flex-col gap-6">
            <motion.div {...fadeUp(0.25)} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Save size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Save Product</h2>
                  <p className="text-xs text-gray-500">Publish your changes</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Product Name</span>
                    <span className="font-medium text-gray-900 truncate max-w-[150px]">{form.name || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price</span>
                    <span className="font-medium text-gray-900">₦{form.price ? Number(form.price).toLocaleString() : '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Stock</span>
                    <span className="font-medium text-gray-900">{form.stock || '—'} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Images</span>
                    <span className="font-medium text-gray-900">{images.length || (imageUrl ? 1 : 0)} total</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className={`font-medium ${form.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                      {form.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={saving} className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 mb-3">
                {saving ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </motion.div>
                    {isEdit ? 'Saving Changes...' : 'Creating Product...'}
                  </>
                ) : (
                  <>
                    {isEdit ? <Save size={18} /> : <Plus size={18} />}
                    {isEdit ? 'Save Changes' : 'Create Product'}
                  </>
                )}
              </motion.button>
              <Link to="/admin/products" className="w-full flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors py-3">
                Cancel
              </Link>
              {(form.name && form.price && form.category && form.stock && (images.length > 0 || imageUrl)) ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <CheckCircle size={14} />
                  All required fields completed
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                  <AlertCircle size={14} />
                  Complete all required fields to save
                </motion.div>
              )}
            </motion.div>
            <motion.div {...fadeUp(0.3)} className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                <CheckCircle size={16} />
                Quick Tips
              </h3>
              <ul className="space-y-2 text-xs text-blue-700">
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Use high-quality images</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Image URLs for supplier images</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Delete images permanently</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Stock 0 = out of stock</li>
              </ul>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
