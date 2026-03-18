import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft, MessageCircle, User, Phone,
  Mail, MapPin, Package, CreditCard
} from 'lucide-react';
import { getAdminOrder, updateOrderStatus } from '../../api/index';
import { StatusBadge, Spinner } from '../../components/ui/AdminUI';
import toast from 'react-hot-toast';

const STATUSES    = ['pending', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled'];
const PLACEHOLDER = 'https://placehold.co/60x60/F0EBE1/C4602A?text=?';
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay },
});

export default function OrderDetail() {
  const { id } = useParams();
  const [order,     setOrder]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [updating,  setUpdating]  = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    getAdminOrder(id).then((r) => {
      setOrder(r.data.order);
      setNewStatus(r.data.order.status);
    }).finally(() => setLoading(false));
  }, [id]);

  const handleStatusUpdate = async () => {
    if (newStatus === order.status) return;
    setUpdating(true);
    try {
      const { data } = await updateOrderStatus(id, { status: newStatus });
      setOrder(data.order);
      toast.success(`Status updated to ${newStatus}`);
    } catch { toast.error('Failed to update status'); }
    finally   { setUpdating(false); }
  };

  const buildWaLink = (order) => {
    const number = import.meta.env.VITE_STORE_WHATSAPP || '';
    const items  = order.items.map((i) => `• ${i.name} x${i.quantity} — ₦${i.price?.toLocaleString()}`).join('\n');
    const msg    =
      `📦 Order ${order.orderNumber}\n` +
      `Customer: ${order.customer?.name}\n` +
      `Phone: ${order.customer?.phone}\n\n` +
      `Items:\n${items}\n\n` +
      `Total: ₦${order.total?.toLocaleString()}\n` +
      `Status: ${order.status}`;
    return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Spinner size={28} /></div>;
  if (!order)  return <div className="p-6 text-center text-text-muted">Order not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <motion.div {...fadeUp(0)}>
        <Link to="/admin/orders" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary mb-6 transition-colors">
          <ChevronLeft size={15} /> Back to orders
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text">{order.orderNumber}</h1>
            <p className="text-text-muted text-sm mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Left */}
        <div className="md:col-span-2 flex flex-col gap-5">

          {/* Items */}
          <motion.div {...fadeUp(0.1)} className="bg-white border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2">
              <Package size={15} className="text-text-muted" />
              <h2 className="font-semibold text-text text-sm">Order items ({order.items?.length})</h2>
            </div>
            <div className="divide-y divide-border">
              {order.items?.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <img src={item.image || PLACEHOLDER} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text text-sm line-clamp-1">{item.name}</p>
                    <p className="text-text-muted text-xs mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-text text-sm whitespace-nowrap">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-border bg-surface-secondary flex justify-between">
              <span className="text-sm text-text-muted">Subtotal</span>
              <span className="font-medium text-sm text-text">₦{order.subtotal?.toLocaleString()}</span>
            </div>
            <div className="px-5 py-3 border-t border-border flex justify-between">
              <span className="font-semibold text-text">Total</span>
              <span className="font-bold text-text">₦{order.total?.toLocaleString()}</span>
            </div>
          </motion.div>

          {/* Customer */}
          <motion.div {...fadeUp(0.2)} className="bg-white border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <User size={15} className="text-text-muted" />
              <h2 className="font-semibold text-text text-sm">Customer details</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { icon: User,         label: 'Name',        value: order.customer?.name },
                { icon: Phone,        label: 'Phone',       value: order.customer?.phone },
                { icon: Mail,         label: 'Email',       value: order.customer?.email || '—' },
                { icon: MapPin,       label: 'Fulfilment',  value: order.fulfillmentType },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <div className="flex items-center gap-1 mb-0.5">
                    <Icon size={12} className="text-text-muted" />
                    <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">{label}</p>
                  </div>
                  <p className="text-text capitalize">{value}</p>
                </div>
              ))}
            </div>

            {order.fulfillmentType === 'delivery' && order.deliveryAddress && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin size={12} className="text-text-muted" />
                  <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">Delivery address</p>
                </div>
                <p className="text-text text-sm">
                  {[order.deliveryAddress.street, order.deliveryAddress.city, order.deliveryAddress.state].filter(Boolean).join(', ')}
                </p>
                {order.deliveryAddress.notes && (
                  <p className="text-text-muted text-xs mt-1">Note: {order.deliveryAddress.notes}</p>
                )}
              </div>
            )}

            {order.customerNote && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-text-muted uppercase tracking-widest font-semibold mb-1">Customer note</p>
                <p className="text-text text-sm">{order.customerNote}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">

          {/* Status */}
          <motion.div {...fadeUp(0.15)} className="bg-white border border-border rounded-2xl p-5">
            <h2 className="font-semibold text-text text-sm mb-4">Update status</h2>
            <select
              value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border border-cream-dark focus:border-terra focus:ring-2 focus:ring-terra/20 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors capitalize mb-3"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={handleStatusUpdate}
              disabled={updating || newStatus === order.status}
              className="w-full bg-terra hover:bg-terra-dark disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              {updating ? 'Updating…' : 'Update status'}
            </motion.button>
          </motion.div>

          {/* WhatsApp */}
          <motion.a
            {...fadeUp(0.2)}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
            href={buildWaLink(order)} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            <MessageCircle size={16} /> Contact on WhatsApp
          </motion.a>

          {/* Payment */}
          <motion.div {...fadeUp(0.25)} className="bg-white border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard size={15} className="text-text-muted" />
              <h2 className="font-semibold text-text text-sm">Payment</h2>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-muted">Status</span>
              <span className={`font-medium capitalize ${order.paymentStatus === 'paid' ? 'text-success' : 'text-warning'}`}>
                {order.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Amount</span>
              <span className="font-semibold text-text">₦{order.total?.toLocaleString()}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}