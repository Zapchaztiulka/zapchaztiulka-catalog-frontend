export const selectDepartmentsError = (state) => state.departments.error;
export const selectSettlements = (state) => state.departments.settlements
import { createSelector } from '@reduxjs/toolkit';
export const selectDepartments = state => state.departments;

export const selectWaherousesNP = createSelector(
  selectDepartments,
  departments => departments.warehousesNP
);

export const selectStreets = createSelector(
  selectDepartments,
  departments => departments.streets
);

export const selectRegions = createSelector(
  selectDepartments,
  departments => departments.regions
);

export const selectDepartmentsLoading = createSelector(
  selectDepartments,
  departments => ({
    settlements: departments.isLoadingSettlements,
    warehouses: departments.isLoadingWarehouses,
    streets: departments.isLoadingStreets,
    regions: departments.isLoadingRegions,
  })
);
