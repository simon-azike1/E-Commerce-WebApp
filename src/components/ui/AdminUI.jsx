import { motion, AnimatePresence } from 'framer-motion';

// ── Stat Card ─────────────────────────────────────────────────────────────────
export function StatCard({ label, value, icon: Icon, color = 'primary', sub }) {
  const colors = {
    primary: 'bg-orange-50 text-orange-600',
    success: 'bg-green-50 text-green-600',
    warning: 'bg-yellow-50 text-yellow-600',
    info:    'bg-blue-50 text-blue-600',
    danger:  'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const map = {
    pending:    'bg-yellow-100 text-yellow-800',
    confirmed:  'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    dispatched: 'bg-orange-100 text-orange-800',
    delivered:  'bg-green-100 text-green-800',
    cancelled:  'bg-red-100 text-red-800',
  };
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────────
export function Spinner({ size = 20 }) {
  return (
    <div
      className="border-2 border-gray-200 border-t-orange-600 rounded-full animate-spin"
      style={{ width: size, height: size }}
    />
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, sub, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
        <Icon size={28} className="text-gray-400" />
      </div>
      <p className="font-semibold text-gray-900">{title}</p>
      {sub && <p className="text-sm text-gray-500 max-w-xs">{sub}</p>}
      {action}
    </div>
  );
}

// ── Confirm Modal ─────────────────────────────────────────────────────────────
export function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{    opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
        >
          <p className="text-sm text-gray-800 mb-6 leading-relaxed">{message}</p>
          <div className="flex gap-3 justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              Delete
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}