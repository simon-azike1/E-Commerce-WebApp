import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach token to every request
api.interceptors.request.use((config) => {
  // Use adminToken if present, otherwise fall back to accessToken
  const token = localStorage.getItem('adminToken') || localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});  
// If 401, clear admin token and redirect to admin login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

// ── Storefront ────────────────────────────────────────────────────────────────
export const getProducts   = (params) => api.get('/products', { params });
export const getProduct    = (id)     => api.get(`/products/${id}`);
export const getCategories = ()       => api.get('/categories');
export const placeOrder    = (data)   => api.post('/orders', data);

// ── Admin — Auth ──────────────────────────────────────────────────────────────
export const adminLogin    = (data)   => api.post('/auth/login', data);

// ── Admin — Products ──────────────────────────────────────────────────────────
export const getAdminProducts = ()          => api.get('/products/admin/all');
export const createProduct    = (data)      => api.post('/products', data);
export const updateProduct    = (id, data)  => api.put(`/products/${id}`, data);
export const deleteProduct    = (id)        => api.delete(`/products/${id}`);
export const deleteProductImage = (id, publicId) => api.delete(`/products/${id}/images/${encodeURIComponent(publicId)}`);

// ── Admin — Orders ────────────────────────────────────────────────────────────
export const getAdminOrders    = (params)   => api.get('/orders', { params });
export const getAdminOrder     = (id)       => api.get(`/orders/${id}`);
export const exportOrders      = (params)   => api.get('/orders/export', { params, responseType: 'blob' });
export const updateOrderStatus = (id, data) => api.patch(`/orders/${id}/status`, data);

// ── Admin — Categories ────────────────────────────────────────────────────────
export const createCategory = (data)      => api.post('/categories', data);
export const updateCategory = (id, data)  => api.put(`/categories/${id}`, data);
export const deleteCategory = (id)        => api.delete(`/categories/${id}`);

export default api;