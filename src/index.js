import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'; //https://reacttraining.com/react-router/web/example/basic
import reduxThunk from 'redux-thunk';

import Header from './components/header';
import Landings from './components/landing';
import Signin from './components/auth/signin';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route path='/' component={Header} />             {/*Matches all routes since root*/}
        <Route exact path='/' component={Landings} />     {/*Matches only root since exact*/}
        <Route path='/signin' component={Signin} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));



// import App from './components/app';
// {/*<App />*/ }
// {/*<Route path='/signin' component={Signin} />*/ }