export const SET_SELECTED = 'SET_SELECTED';
export const SET_SELECTED_LOCAL_STORAGE = 'SET_SELECTED_LOCAL_STORAGE';
export const SET_SORT_TYPE = 'SET_SORT_TYPE';

export const setSelected = selected => ({
  type: SET_SELECTED,
  payload: selected,
});

export const setSelectedLocalStorage = selected => ({
  type: SET_SELECTED_LOCAL_STORAGE,
  payload: selected,
});

export const setSortType = newSortType => ({
  type: SET_SORT_TYPE,
  payload: newSortType,
});