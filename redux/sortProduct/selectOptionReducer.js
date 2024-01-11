import { SET_SELECTED, SET_SELECTED_LOCAL_STORAGE, SET_SORT_TYPE } from './selectedOptionActions';

const initialState = {
  selected: null,
  sortType: [],
};

const selectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    case SET_SELECTED_LOCAL_STORAGE:
      localStorage.setItem('selected', action.payload);
      return state;
    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    default:
      return state;
  }
};


export default selectedReducer;
