// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  MEETER_RANGE_UPDATE,
} from './constants';

export function rangeUpdate(newRange) {
  return {
    type: MEETER_RANGE_UPDATE,
    payload: newRange
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MEETER_RANGE_UPDATE:
      const {...dayRanges} = state.dayRanges
      dayRanges[state.day] = action.payload
      return {...state, dayRanges}
    default:
      return state;
  }
}
