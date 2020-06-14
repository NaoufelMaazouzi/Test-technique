import { FETCH_PRODUCTS_SUCCES, FETCH_PRODUCTS_FAIL } from './types';
import Axios from 'axios';
import io from "socket.io-client";
const ENDPOINT = "localhost:5000";
let socket;

//ACTION WHEN FETCH PRODUCTS IS A SUCCES
export const fetchProductsSuccess = (products, productsDeleted) => {
    return {
        type: FETCH_PRODUCTS_SUCCES,
        payload: productsDeleted ? productsDeleted : products
    }
}

//ACTION WHEN FETCH PRODUCTS IS A FAIL
export const fetchProductsFail = (error) => {
    return {
        type: FETCH_PRODUCTS_FAIL,
        payload: error
    }
}

let productsFetched;

//FETCH ALL PRODUCTS THEN DISPATCH THE RESULT TO ACTIONS
export const fetchProducts = () => {
    return (dispatch) => {
        Axios.get(`http://localhost:5000/products/`)
            .then(response => {
                productsFetched = response.data;
                dispatch(fetchProductsSuccess(productsFetched));
            })
            .catch(error => {
                const errorMsgFilmSearch = error.message;
                dispatch(fetchProductsFail(errorMsgFilmSearch));
            })
    }
}

//DELETE A PRODUCT BY HIS ID THEN DISPATCH THE RESULT TO ACTIONS
export const deleteProducts = (id) => {
    return (dispatch) => {
        socket = io(ENDPOINT);

        //TRIGGERED "deleteProducts" EMIT TO DELETE THE PRODUCT FOR ALL USERS CONNECTED
        socket.emit('deleteProducts');

        Axios.delete('http://localhost:5000/products/' + id)
            .then(res => console.log(res.data))
            .catch((err) => {
                console.log(err)
            })
        const productsDeleted = productsFetched.filter(el => el._id !== id);
        dispatch(fetchProductsSuccess(productsDeleted));
    }
}

//CREATE A PRODUCT
export const createProducts = (product) => {
    return (dispatch) => {
        Axios.post('http://localhost:5000/products/add', product)
            .then(res => console.log(res.data))
            .catch((err) => {
                console.log(err);
            })

        //RETURN TO THE "/" LOCATION
        window.location = '/'
    }
}

export const editProducts = (param, product) => {
    return (dispatch) => {
        Axios.post('http://localhost:5000/products/update/' + param, product)
            .then(res => console.log(res.data))
            .catch((err) => {
                console.log(err);
            })

        //RETURN TO THE "/" LOCATION
        window.location = '/'
    }
}

console.log(productsFetched);