import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { fetchProducts, createProducts } from '../redux/fetchProducts/fetchProductsActions';
import io from "socket.io-client";
const ENDPOINT = "localhost:5000";
let socket;

function CreateProducts({ fetchProducts, createProducts }) {


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

    //FETCH PRODUCTS WHEN COMPONENT IS MOUNTED
    useEffect(() => {
        fetchProducts();
    }, [])

    //TRIGGERED FUNCTIONS ON CHANGE OF INPUT
    function onChangeName(e) {
        setName(e.target.value);
    }
    function onChangeType(e) {
        setType(e.target.value);
    }
    function onChangePrice(e) {
        setPrice(e.target.value);
    }
    function onChangeRating(e) {
        setRating(e.target.value);
    }
    function onChangeWarranty_years(e) {
        setWarranty_years(e.target.value);
    }
    function onChangeAvailable(e) {
        setAvailable(e.target.value);
    }

    //"addProducts" EMIT TRIGGERED ON SUBMIT THE FORM
    function onsubmit(e) {
        socket = io(ENDPOINT);
        socket.emit('addProducts', { name: name, type, price, rating, warranty_years, available });

        e.preventDefault();
        const product = {
            name,
            type,
            price,
            rating,
            warranty_years,
            available
        }
        //REDUX ACTIONS TO CREATE A PRODUCT
        createProducts(product);
    }

    const classes = useStyles();

    return (
        <div className="container">
            <h1 className={classes.title}>Créer un produit</h1>

            <form className={classes.root} noValidate autoComplete="off" onSubmit={onsubmit}>
                <TextField id="outlined-basic" label="Nom" variant="outlined" value={name} onChange={onChangeName} required />
                <TextField id="outlined-basic" label="Type" variant="outlined" value={type} onChange={onChangeType} required />
                <TextField type="number" id="outlined-basic" label="Prix" variant="outlined" value={price} onChange={onChangePrice} required />
                <TextField id="outlined-basic" label="Note" variant="outlined" value={rating} onChange={onChangeRating} required />
                <TextField type="number" id="outlined-basic" label="Garantie" variant="outlined" value={warranty_years} onChange={onChangeWarranty_years} required />
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
                <Button variant="contained" color="primary" type="submit" className={classes.btn}>Créer le produit</Button>

            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.fetchProductsReducers.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        createProducts: (product) => dispatch(createProducts(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProducts);
