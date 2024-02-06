import { createSlice } from '@reduxjs/toolkit';
import { fetchSettlements, fetchStreets, fetchWarehouses } from './novaPoshtaOperations';

const initialState = {
  warehousesNP: [],
  settlements: [],
  streets:[],
  isLoading: false,
  error: null,
  totalCount: 0,
};

const departmentsSlice = createSlice({
  name: 'departments',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettlements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSettlements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.settlements = action.payload;
        state.totalCount = action.payload.info.totalCount;

      })
      .addCase(fetchSettlements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
       state.warehousesNP = action.payload;
    })
     .addCase(fetchStreets.fulfilled, (state, action) => {
       state.streets = action.payload;
    })
  },
});

export const departmentsReducer = departmentsSlice.reducer;