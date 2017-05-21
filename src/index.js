import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //https://reacttraining.com/react-router/web/example/basic
import reduxThunk from 'redux-thunk';

import Header from './components/header';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Route path='/' component={Header} />             {/*Matches all routes since root*/}
        <Route exact path='/' component={Welcome} />      {/*Matches only root since exact*/}
        <Switch>
          <Route path='/signin' component={Signin} />
          <Route path='/signout' component={Signout} />
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.querySelector('.container'));



// import App from './components/app';
// {/*<App />*/ }
// {/*<Route path='/signin' component={Signin} />*/ }