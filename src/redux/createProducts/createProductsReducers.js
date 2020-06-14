import { CREATE_PRODUCTS_SUCCES, CREATE_PRODUCTS_FAIL } from './types';

const initialeState = () => {
    return {
        name: '',
        type: '',
        price: '',
        rating: '',
        warranty_years: '',
        available: '',
        error: ''
    }
}



const changeProductsReducers = (state = initialeState, action) => {
    switch (action.type) {
        case "CHANGE_NAME":
            return {
                name: action.payload,
                error: ''
            }
        case "CHANGE_TYPE":
            return {
                type: action.payload,
                error: ''
            }
        case "CHANGE_PRICE":
            return {
                price: action.payload,
                error: ''
            }
        case "CHANGE_RATING":
            return {
                rating: action.payload,
                error: ''
            }
        case "CHANGE_WARRANTY_YEARS":
            return {
                warranty_years: action.payload,
                error: ''
            }
        case "CHANGE_AVAILABLE":
            return {
                available: action.payload,
                error: ''
            }
        /*case FETCH_PRODUCTS_FAIL:
            return {
                products: [],
                error: action.payload
            }
        case PRODUCT_CREATED:
            return {
                products: [initialeState],
                error: action.payload
            }*/
        default:
            return state
    }
}

export default changeProductsReducers;