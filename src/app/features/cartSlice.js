import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart } from "../../utils/index.js";

const initialState = {
  cartItems: [],
  total: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems = addItemToCart(action.payload, state.cartItems);
    },
    increaseQuantity(state, action) {
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      state.cartItems = newCartItems;
      state.total += 1;
    },
    decreaseQuantity(state, action) {
      const itemToDecrease = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
      } else {
        const nextCartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
        state.cartItems = nextCartItems;
        state.total -= 1;
      }
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      const itemToRemove = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      state.total -= itemToRemove.quantity;
      state.cartItems = nextCartItems;
    },
    clearCart(state) {
      state.cartItems = [];
      state.total = 0;
    },
    getTotalCheckout(state) {
      const totalSum = state.cartItems.reduce((total, item) => {
        console.log(total)
        let itemTotal= item.quantity * item.price;
        return total +itemTotal;
      }, 0);
      state.total = totalSum;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity,clearCart,getTotalCheckout } =
  cartSlice.actions;
export const selectedCart = ({ cart }) => cart;
export default cartSlice.reducer;
