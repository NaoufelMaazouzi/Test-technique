import { combineReducers } from 'redux';
import fetchProductsReducers from './fetchProducts/fetchProductsReducers';
import changeProductsReducers from './editProducts/editProductsReducers';

const rootReducer = combineReducers({
  fetchProductsReducers,
  changeProductsReducers,
});

export default rootReducer;
