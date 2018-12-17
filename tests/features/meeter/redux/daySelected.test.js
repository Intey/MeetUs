import {
  MEETER_DAY_SELECTED,
} from '../../../../src/features/meeter/redux/constants';

import {
  daySelected,
  reducer,
} from '../../../../src/features/meeter/redux/daySelected';

describe('meeter/redux/daySelected', () => {
  it('returns correct action by daySelected', () => {
    expect(daySelected()).toHaveProperty('type', MEETER_DAY_SELECTED);
  });

  it('handles action type MEETER_DAY_SELECTED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MEETER_DAY_SELECTED, payload: 1 }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = 1;
    expect(state).toEqual(expectedState);
  });
});
