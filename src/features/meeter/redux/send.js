import {
  MEETER_SEND_BEGIN,
  MEETER_SEND_SUCCESS,
  MEETER_SEND_FAILURE,
  MEETER_SEND_DISMISS_ERROR,
} from './constants';
import { post } from '../../../api';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function send(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: MEETER_SEND_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = post('http://localhost:8000/api/users/1/meets/', {
        meets: [
          { date: '2018-11-12',
            timeRange: '18:00 - 22:00'
          },
          { date: '2018-11-11',
            timeRange: '15:00 - 18:00'
          },
          { date: '2018-11-12',
            timeRange: '20:00 - 23:00'
          },
        ]
      });
    doRequest.then(res => res.json()).then(
        res => {
          dispatch({
            type: MEETER_SEND_SUCCESS,
            payload: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: MEETER_SEND_FAILURE,
            payload: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSendError() {
  return {
    type: MEETER_SEND_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MEETER_SEND_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        sendPending: true,
        sendError: null,
      };

    case MEETER_SEND_SUCCESS:
      // The request is success
      return {
        ...state,
        sendPending: false,
        sendError: null,
      };

    case MEETER_SEND_FAILURE:
      // The request is failed
      return {
        ...state,
        sendPending: false,
        sendError: action.data,
      };

    case MEETER_SEND_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        sendError: null,
      };

    default:
      return state;
  }
}
