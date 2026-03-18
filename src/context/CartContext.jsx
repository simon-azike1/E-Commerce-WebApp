import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i._id === action.product._id);
      if (existing) {
        return state.map((i) =>
          i._id === action.product._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case 'REMOVE':
      return state.filter((i) => i._id !== action.id);
    case 'UPDATE_QTY':
      return state.map((i) =>
        i._id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const saved = localStorage.getItem('shopflow_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('shopflow_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart      = (product) => dispatch({ type: 'ADD', product });
  const removeFromCart = (id)      => dispatch({ type: 'REMOVE', id });
  const updateQty      = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart      = ()        => dispatch({ type: 'CLEAR' });

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};