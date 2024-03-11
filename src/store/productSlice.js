import { createSlice } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunk
export function fetchProduct() {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(setProducts(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
