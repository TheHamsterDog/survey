import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk'
import {auth} from './reducers';
// import {alert} from './reducers';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,combineReducers} from 'redux';
const store = createStore(auth, applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
