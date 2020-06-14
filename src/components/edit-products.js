import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { fetchProducts, editProducts } from '../redux/fetchProducts/fetchProductsActions';
import io from "socket.io-client";
import { changeName, changeType, changePrice, changeRating, changeWarranty, changeAvailable } from '../redux/createProducts/createProductsActions';
const ENDPOINT = "localhost:5000";
let socket;

const EditProducts = ({ match, editProducts /* product, , changeName, changeType, changePrice, changeRating, changeWarranty, changeAvailable*/ }) => {

    const [name, setName] = useState();
    const [type, setType] = useState();
    const [price, setPrice] = useState();
    const [rating, setRating] = useState();
    const [warranty_years, setWarranty_years] = useState();
    const [available, setAvailable] = useState();

    //GLOBAL STYLE
    const useStyles = makeStyles((theme) => ({
        root: {
            textAlign: 'center',
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        title: {
            textAlign: 'center',
            marginTop: 60,
            paddingBottom: 20
        },
        btn: {
            marginTop: 40,
            minHeight: 50,
            minWidth: 200
        }
    }));

    useEffect(() => {
        axios.get('http://localhost:5000/products/' + match.params.id)
            .then(response => {
                setName(response.data.name);
                setType(response.data.type);
                setPrice(response.data.price);
                setRating(response.data.rating);
                setWarranty_years(response.data.warranty_years);
                setAvailable(response.data.available);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    //TRIGGERED FUNCTIONS ON CHANGE OF INPUT
    function onChangeName(e) {
        setName(e.target.value);
        // changeName(e.target.value);
    }
    function onChangeType(e) {
        setType(e.target.value);
        // changeType(e.target.value);
    }
    function onChangePrice(e) {
        setPrice(e.target.value);
        // changePrice(e.target.value);
    }
    function onChangeRating(e) {
        setRating(e.target.value);
        // changeRating(e.target.value);
    }
    function onChangeWarranty_years(e) {
        setWarranty_years(e.target.value);
        // changeWarranty(e.target.value);
    }
    function onChangeAvailable(e) {
        setAvailable(e.target.value);
        // changeAvailable(e.target.value);
    }

    //"modifyProduct" EMIT TRIGGERED ON SUBMIT THE FORM
    function onsubmit(e) {
        socket = io(ENDPOINT);
        socket.emit('modifyProducts');

        e.preventDefault();
        const product = {
            name,
            type,
            price,
            rating,
            warranty_years,
            available
        }

        editProducts(match.params.id, product)
    }

    const classes = useStyles();

    return (
        <div className="container">
            <h1 className={classes.title}>Modifier le produit</h1>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onsubmit}>
                <TextField id="standard-basic" label="Nom" value={name} onChange={onChangeName} />
                <TextField id="standard-basic" label="Type" value={type} onChange={onChangeType} />
                <TextField type="number" id="standard-basic" label="Prix" value={price} onChange={onChangePrice} />
                <TextField type="number" id="standard-basic" label="Note" value={rating} onChange={onChangeRating} />
                <TextField type="number" id="standard-basic" label="Garantie" value={warranty_years} onChange={onChangeWarranty_years} />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Disponible</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={available}
                        onChange={onChangeAvailable}
                    >
                        <MenuItem value={true}>Oui</MenuItem>
                        <MenuItem value={false}>Non</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type="submit" className={classes.btn} >Modifier le produit</Button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        name: state.changeProductsReducers.name,
        /*type: state.changeProductsReducers.type,
        price: state.changeProductsReducers.price,
        rating: state.changeProductsReducers.name,
        warranty_years: state.changeProductsReducers.warranty_years,
        available: state.changeProductsReducers.available,
        product: state.changeProductsReducers.product*/
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        editProducts: (param, product) => dispatch(editProducts(param, product)),
        /*changeName: (name) => dispatch(changeName(name)),
        changeType: (type) => dispatch(changeType(type)),
        changePrice: (price) => dispatch(changePrice(price)),
        changeRating: (rating) => dispatch(changeRating(rating)),
        changeWarranty: (warranty) => dispatch(changeWarranty(warranty)),
        changeAvailable: (available) => dispatch(changeAvailable(available))*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProducts);
