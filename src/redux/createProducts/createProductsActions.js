import { CREATE_PRODUCTS_SUCCES, CREATE_PRODUCTS_FAIL } from './types';
import Axios from 'axios';
import io from "socket.io-client";
const ENDPOINT = "localhost:5000";
let socket;

export const changeNameActions = (name) => {
    return {
        type: "CHANGE_NAME",
        payload: name
    }
}

export const changeTypeActions = (type) => {
    return {
        type: "CHANGE_TYPE",
        payload: type
    }
}

export const changePriceActions = (price) => {
    return {
        type: "CHANGE_PRICE",
        payload: price
    }
}

export const changeRatingActions = (rating) => {
    return {
        type: "CHANGE_RATING",
        payload: rating
    }
}

export const changeWarrantyActions = (warranty_years) => {
    return {
        type: "CHANGE_WARRANTY_YEARS",
        payload: warranty_years
    }
}

export const changeAvailableActions = (available) => {
    return {
        type: "CHANGE_AVAILABLE",
        payload: available
    }
}

export const createProductsFail = (error) => {
    return {
        type: CREATE_PRODUCTS_FAIL,
        payload: error
    }
}

export const changeName = (name) => {
    return (dispatch) => {
        dispatch(changeNameActions(name));
        console.log("nom changéééé")
    }
}

export const changeType = (type) => {
    return (dispatch) => {
        dispatch(changeTypeActions(type));
        console.log("type changéééé")
    }
}
export const changePrice = (price) => {
    return (dispatch) => {
        dispatch(changePriceActions(price));
        console.log("price changéééé")
    }
}
export const changeRating = (rating) => {
    return (dispatch) => {
        dispatch(changeRatingActions(rating));
        console.log("rating changéééé")
    }
}
export const changeWarranty = (warranty) => {
    return (dispatch) => {
        dispatch(changeWarrantyActions(warranty));
        console.log("warranty changéééé")
    }
}
export const changeAvailable = (available) => {
    return (dispatch) => {
        dispatch(changeAvailableActions(available));
        console.log("available changéééé")
    }
}


export const createProducts = (product) => {
    return (dispatch) => {
        socket = io(ENDPOINT);

        Axios.post('http://localhost:5000/products/add', product)
            .then(res => console.log(res.data))
            .catch((err) => {
                console.log(err);
            })

        window.location = '/'
    }
}

//EDIT A PRODUCT
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