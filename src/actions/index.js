import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }, redirectToFeatureCallback) {         // returning function instead of object (type, payload) because we're using Thunk middleware
  return function (dispatch) {                            // hijack the regular dispatch method which is sync and instantly dispatches actions to reducers. do your own async stuffs in and as a dispatcher
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good, we need to
        // - Update state to indicate state user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - Redirect to the route '/feature' (Programmatic navigation)
        redirectToFeatureCallback();
      })
      .catch(() => {
        // If request is bad,
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}