import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import fetchProductsReducers from './redux/fetchProducts/fetchProductsReducers';
import changeProductsReducers from './redux/createProducts/createProductsReducers';
import rootReducer from './redux/rootReducer';


//CREATE THE STORE WITH THE FETCH PRODUCTS REDUCER
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
