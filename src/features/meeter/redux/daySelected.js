// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  MEETER_DAY_SELECTED,
} from './constants';

export function daySelected(i) {
  return {
    type: MEETER_DAY_SELECTED,
    payload: i
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MEETER_DAY_SELECTED:
      return {...state, day: action.payload}
    default:
      return state;
  }
}
