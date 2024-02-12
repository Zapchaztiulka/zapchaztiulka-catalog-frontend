import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSettlements,
  fetchStreets,
  fetchWarehouses,
  fetchRegions,
} from './novaPoshtaOperations';

const initialState = {
  warehousesNP: [],
  settlements: [],
  regions: [],
  streets: [],
  isLoadingSettlements: false,
  isLoadingWarehouses: false,
  isLoadingStreets: false,
  isLoadingRegions: false,
  error: null,
  totalCount: 0,
};

const departmentsSlice = createSlice({
  name: 'departments',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchSettlements.pending, state => {
        state.isLoadingSettlements = true;
      })
      .addCase(fetchSettlements.fulfilled, (state, action) => {
        state.isLoadingSettlements = false;
        state.error = null;
        state.settlements = action.payload;
        state.totalCount = action.payload.info.totalCount;
      })
      .addCase(fetchSettlements.rejected, (state, action) => {
        state.isLoadingSettlements = false;
        state.error = action.payload;
      })
      .addCase(fetchWarehouses.pending, state => {
        state.isLoadingWarehouses = true;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.isLoadingWarehouses = false;
        state.error = null;
        state.warehousesNP = action.payload;
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.isLoadingWarehouses = false;
        state.error = action.payload;
      })
      .addCase(fetchStreets.pending, state => {
        state.isLoadingStreets = true;
      })
      .addCase(fetchStreets.fulfilled, (state, action) => {
        state.isLoadingStreets = false;
        state.error = null;
        state.streets = action.payload;
      })
      .addCase(fetchStreets.rejected, (state, action) => {
        state.isLoadingStreets = false;
        state.error = action.payload;
      })
      .addCase(fetchRegions.pending, state => {
        state.isLoadingRegions = true;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.isLoadingRegions = false;
        state.error = null;
        state.regions = action.payload;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.isLoadingRegions = false;
        state.error = action.payload;
      });
  },
});

export const departmentsReducer = departmentsSlice.reducer;
