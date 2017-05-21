import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

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

export function signupUser({ email, password }, redirectToFeatureCallback) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        redirectToFeatureCallback();
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}