import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    remove(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        const newState = [...state.slice(0, index), ...state.slice(index + 1)];
        localStorage.setItem("cartItems", JSON.stringify(newState));
        return newState;
      }
      return state;
    },
    clear() {
      localStorage.removeItem("cartItems");
      return [];
    },
  },
});

export const { add, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
