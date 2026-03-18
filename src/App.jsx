import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import Navbar  from './components/layout/Navbar';
import Footer  from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import ScrollToTop from './components/layout/ScrollToTop';

// ── Storefront pages ──────────────────────────────────────────────────────────
import Home              from './pages/Home';
import Shop              from './pages/Shop';
import About             from './pages/About';
import Contact           from './pages/Contact';
import Services          from './pages/Services';
import ProductDetail     from './pages/ProductDetail';
import Cart              from './pages/Cart';
import Checkout          from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

// ── Admin pages ───────────────────────────────────────────────────────────────
import AdminLogin  from './pages/admin/Login';
import Dashboard   from './pages/admin/Dashboard';
import Orders      from './pages/admin/Orders';
import OrderDetail from './pages/admin/OrderDetail';
import Products    from './pages/admin/Products';
import ProductForm from './pages/admin/ProductForm';
import Categories  from './pages/admin/Categories';
import Analytics   from './pages/admin/Analytics';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0  }}
      exit={{    opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function AdminLayout() {
  const { isAuth } = useAuth();
  if (!isAuth) return <Navigate to="/admin/login" replace />;
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function StorefrontLayout() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"                   element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/shop"               element={<PageWrapper><Shop /></PageWrapper>} />
            <Route path="/about"              element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact"            element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/services"           element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/product/:id"        element={<PageWrapper><ProductDetail /></PageWrapper>} />
            <Route path="/cart"               element={<PageWrapper><Cart /></PageWrapper>} />
            <Route path="/checkout"           element={<PageWrapper><Checkout /></PageWrapper>} />
            <Route path="/order-confirmation" element={<PageWrapper><OrderConfirmation /></PageWrapper>} />
            <Route path="*" element={
              <PageWrapper>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
                  <h1 className="font-display text-5xl font-bold text-charcoal">404</h1>
                  <p className="text-stone">This page doesn't exist.</p>
                  <a href="/" className="text-terra underline text-sm">Go home</a>
                </div>
              </PageWrapper>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<AdminLayout />}>
                  <Route path="/admin"                   element={<Dashboard />} />
                  <Route path="/admin/orders"            element={<Orders />} />
                  <Route path="/admin/orders/:id"        element={<OrderDetail />} />
                  <Route path="/admin/orders/:id/detail" element={<OrderDetail />} />
                  <Route path="/admin/products"          element={<Products />} />
                  <Route path="/admin/products/new"      element={<ProductForm />} />
                  <Route path="/admin/products/:id/edit" element={<ProductForm />} />
                  <Route path="/admin/categories"        element={<Categories />} />
                  <Route path="/admin/analytics"         element={<Analytics />} />
                </Route>
                <Route path="/*" element={<StorefrontLayout />} />
              </Routes>

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '14px',
                background: '#1E1A16',
                color: '#FAF7F2',
                borderRadius: '12px',
              },
              success: { iconTheme: { primary: '#C4602A', secondary: '#FAF7F2' } },
            }}
          />
        </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
