import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //https://reacttraining.com/react-router/web/example/basic
import reduxThunk from 'redux-thunk';

import Header from './components/header';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require_auth';
import Feature from './components/feature';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path='/' component={Header} />                         {/*Matches all routes since root*/}
        <Switch>                                                      {/*Any one of below matching routes*/}
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/signout' component={Signout} />
          <Route path='/feature' component={RequireAuth(Feature)} />
          <Route path='/' component={Welcome} />
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.querySelector('.container'));
