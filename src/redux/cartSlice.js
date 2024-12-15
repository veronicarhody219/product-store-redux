import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart
    ? JSON.parse(savedCart)
    : { items: [], totalQuantity: 0, totalPrice: 0 };
};
const initialState = loadCartFromLocalStorage();
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
    incrementQuantity(state, action) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += existing.price;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    decrementQuantity(state, action) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
        existing.totalQuantity -= 1;
        existing.totalPrice -= existing.price;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.totalQuantity -= existing.quantity;
        state.totalPrice -= existing.price;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;
export default cartSlice.reducer;
