import { combineReducers } from 'redux';
import fetchProductsReducers from './fetchProducts/fetchProductsReducers';
import changeProductsReducers from './createProducts/createProductsReducers';

const rootReducer = combineReducers({
    fetchProductsReducers,
    changeProductsReducers
})

export default rootReducer;