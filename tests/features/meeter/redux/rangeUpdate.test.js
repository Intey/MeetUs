import {
  MEETER_RANGE_UPDATE,
} from '../../../../src/features/meeter/redux/constants';

import {
  rangeUpdate,
  reducer,
} from '../../../../src/features/meeter/redux/rangeUpdate';

describe('meeter/redux/rangeUpdate', () => {
  it('returns correct action by rangeUpdate', () => {
    expect(rangeUpdate()).toHaveProperty('type', MEETER_RANGE_UPDATE);
  });

  it('handles action type MEETER_RANGE_UPDATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MEETER_RANGE_UPDATE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
