import { AUTH_USER } from '../actions/types';
import { UNAUTH_USER } from '../actions/types';
import { AUTH_ERROR } from '../actions/types';
import { FETCH_MESSAGE } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
  }
  return state;
}