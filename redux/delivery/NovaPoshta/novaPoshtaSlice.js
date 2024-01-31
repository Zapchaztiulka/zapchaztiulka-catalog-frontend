import { createSlice } from '@reduxjs/toolkit';
import { fetchSettlements, fetchWarehouses } from './novaPoshtaOperations';

const initialState = {
  warehousesNP: [],
  settlements: [],
  page: 1,
  isLoading: false,
  error: null,
  totalCount: 0,
};

const departmentsSlice = createSlice({
  name: 'departments',
  initialState: initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.page = action.payload;
    }
  },
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
        console.log(action.payload)
       state.warehousesNP = action.payload;
    })
  },
});

export const { setPageNumber } = departmentsSlice.actions;

export const departmentsReducer = departmentsSlice.reducer;