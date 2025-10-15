// src/store/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProducts: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    clearOrder: (state) => {
      state.selectedProducts = [];
    },
  },
});

export const { setSelectedProducts, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
