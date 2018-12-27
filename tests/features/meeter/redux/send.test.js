import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MEETER_SEND_BEGIN,
  MEETER_SEND_SUCCESS,
  MEETER_SEND_FAILURE,
  MEETER_SEND_DISMISS_ERROR,
} from '../../../../src/features/meeter/redux/constants';

import {
  send,
  dismissSendError,
  reducer,
} from '../../../../src/features/meeter/redux/send';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('meeter/redux/send', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when send succeeds', () => {
    const store = mockStore({});

    return store.dispatch(send())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEETER_SEND_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEETER_SEND_SUCCESS);
      });
  });

  it('dispatches failure action when send fails', () => {
    const store = mockStore({});

    return store.dispatch(send({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MEETER_SEND_BEGIN);
        expect(actions[1]).toHaveProperty('type', MEETER_SEND_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSendError', () => {
    const expectedAction = {
      type: MEETER_SEND_DISMISS_ERROR,
    };
    expect(dismissSendError()).toEqual(expectedAction);
  });

  it('handles action type MEETER_SEND_BEGIN correctly', () => {
    const prevState = { sendPending: false };
    const state = reducer(
      prevState,
      { type: MEETER_SEND_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendPending).toBe(true);
  });

  it('handles action type MEETER_SEND_SUCCESS correctly', () => {
    const prevState = { sendPending: true };
    const state = reducer(
      prevState,
      { type: MEETER_SEND_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendPending).toBe(false);
  });

  it('handles action type MEETER_SEND_FAILURE correctly', () => {
    const prevState = { sendPending: true };
    const state = reducer(
      prevState,
      { type: MEETER_SEND_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendPending).toBe(false);
    expect(state.sendError).toEqual(expect.anything());
  });

  it('handles action type MEETER_SEND_DISMISS_ERROR correctly', () => {
    const prevState = { sendError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MEETER_SEND_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.sendError).toBe(null);
  });
});

