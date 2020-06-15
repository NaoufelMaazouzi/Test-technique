import Axios from 'axios';

export const changeNameActions = (name) => ({
    type: 'CHANGE_NAME',
    payload: name,
});

export const changeTypeActions = (type) => ({
    type: 'CHANGE_TYPE',
    payload: type,
});

export const changePriceActions = (price) => ({
    type: 'CHANGE_PRICE',
    payload: price,
});

export const changeRatingActions = (rating) => ({
    type: 'CHANGE_RATING',
    payload: rating,
});

export const changeWarrantyActions = (warranty_years) => ({
    type: 'CHANGE_WARRANTY_YEARS',
    payload: warranty_years,
});

export const changeAvailableActions = (available) => ({
    type: 'CHANGE_AVAILABLE',
    payload: available,
});

export const changeName = (name) => (dispatch) => {
    dispatch(changeNameActions(name));
};
export const changeType = (type) => (dispatch) => {
    dispatch(changeTypeActions(type));
};
export const changePrice = (price) => (dispatch) => {
    dispatch(changePriceActions(price));
};
export const changeRating = (rating) => (dispatch) => {
    dispatch(changeRatingActions(rating));
};
export const changeWarranty = (warranty) => (dispatch) => {
    dispatch(changeWarrantyActions(warranty));
};
export const changeAvailable = (available) => (dispatch) => {
    dispatch(changeAvailableActions(available));
};

// CREATE A PRODUCT
export const createProducts = (product) => () => {
    Axios.post('http://localhost:5000/products/add', product)
        .then((res) => console.log(res.data))
        .catch((err) => {
            console.log(err);
        });

    // RETURN TO THE "/" LOCATION
    window.location = '/';
};

// EDIT A PRODUCT
export const editProducts = (param, product) => () => {
    Axios.post(`http://localhost:5000/products/update/${param}`, product)
        .then((res) => console.log(res.data))
        .catch((err) => {
            console.log(err);
        });

    // RETURN TO THE "/" LOCATION
    window.location = '/';
};

// FETCH THE NEW PRODUCT THAT WE ADDED
let nameFetched; let typeFetched; let priceFetched; let ratingFetched; let warrantyFetched; let
    availableFetched;
export const fetchNewProduct = (param) => (dispatch) => {
    Axios.get(`http://localhost:5000/products/${param}`)
        .then((response) => {
            nameFetched = response.data.name;
            dispatch(changeName(nameFetched));

            typeFetched = response.data.type;
            dispatch(changeType(typeFetched));

            priceFetched = response.data.price;
            dispatch(changePrice(priceFetched));

            ratingFetched = response.data.rating;
            dispatch(changeRating(ratingFetched));

            warrantyFetched = response.data.warranty_years;
            dispatch(changeWarranty(warrantyFetched));

            availableFetched = response.data.available;
            dispatch(changeAvailable(availableFetched));
        })
        .catch((err) => {
            console.log(err);
        });
};
