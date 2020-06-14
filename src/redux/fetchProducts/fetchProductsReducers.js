import { FETCH_PRODUCTS_SUCCES, FETCH_PRODUCTS_FAIL } from './types';

//INITIALIZE THE EMPTY STATE
const initialeState = () => {
    return {
        products: [],
        error: ''
    }
}

//THE REDUCER FOR FETCHING PRODUCTS
const fetchProductsReducers = (state = initialeState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCES:
            return {
                products: action.payload,
                error: ''
            }
        case FETCH_PRODUCTS_FAIL:
            return {
                products: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default fetchProductsReducers;