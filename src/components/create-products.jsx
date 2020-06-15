import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { fetchProducts } from '../redux/fetchProducts/fetchProductsActions';
import {
  changeName, changeType, changePrice, changeRating, changeWarranty, changeAvailable, createProducts,
} from '../redux/editProducts/editProductsActions';

const ENDPOINT = 'localhost:5000';
let socket;

// IMPORT OF ALL STATE & ACTIONS FROM THE REDUX STORE
function CreateProducts({
  fetchProducts, changeName, changeType, changePrice, changeRating, changeWarranty, changeAvailable, createProducts, name, type, price, rating, warranty_years, available, product,
}) {
  // GLOBAL STYLE
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
      paddingBottom: 20,
    },
    btn: {
      marginTop: 40,
      minHeight: 50,
      minWidth: 200,
    },
  }));

  // FETCH PRODUCTS WHEN COMPONENT IS MOUNTED
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TRIGGERED ACTIONS FROM REDUX WITH INPUTS VALUES
  function onChangeName(e) {
    changeName(e.target.value);
  }
  function onChangeType(e) {
    changeType(e.target.value);
  }
  function onChangePrice(e) {
    changePrice(e.target.value);
  }
  function onChangeRating(e) {
    changeRating(e.target.value);
  }
  function onChangewarranty_years(e) {
    changeWarranty(e.target.value);
  }
  function onChangeAvailable(e) {
    changeAvailable(e.target.value);
  }

  // "addProducts" EMIT TRIGGERED ON SUBMIT THE FORM
  function onsubmit(e) {
    socket = io(ENDPOINT);
    socket.emit('addProducts', {
      name, type, price, rating, warranty_years, available,
    });
    e.preventDefault();

    // REDUX ACTIONS TO CREATE A PRODUCT
    createProducts(product);
  }

  const classes = useStyles();

  return (
    <div className="container">
      <h1 className={classes.title}>Créer un produit</h1>

      <form className={classes.root} noValidate autoComplete="off" onSubmit={onsubmit}>
        <TextField id="outlined-basic" label="Nom" variant="outlined" onChange={onChangeName} required />
        <TextField id="outlined-basic" label="Type" variant="outlined" value={type} onChange={onChangeType} required />
        <TextField type="number" id="outlined-basic" label="Prix" variant="outlined" value={price} onChange={onChangePrice} required />
        <TextField type="number" id="outlined-basic" label="Note" variant="outlined" value={rating} onChange={onChangeRating} required />
        <TextField type="number" id="outlined-basic" label="Garantie" variant="outlined" value={warranty_years} onChange={onChangewarranty_years} required />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Disponible</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={available}
            onChange={onChangeAvailable}
          >
            <MenuItem value>Oui</MenuItem>
            <MenuItem value={false}>Non</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit" className={classes.btn}>Créer le produit</Button>

      </form>
    </div>
  );
}

// IMPORT ALL STATES FROM REDUX
const mapStateToProps = (state) => ({
  products: state.fetchProductsReducers.products,
  name: state.changeProductsReducers.name,
  type: state.changeProductsReducers.type,
  price: state.changeProductsReducers.price,
  rating: state.changeProductsReducers.rating,
  warranty_years: state.changeProductsReducers.warranty_years,
  available: state.changeProductsReducers.available,
  product: state.changeProductsReducers,
});

// IMPORT ALL ACTIONS FROM REDUX
const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  createProducts: (product) => dispatch(createProducts(product)),
  changeName: (name) => dispatch(changeName(name)),
  changeType: (type) => dispatch(changeType(type)),
  changePrice: (price) => dispatch(changePrice(price)),
  changeRating: (rating) => dispatch(changeRating(rating)),
  changeWarranty: (warranty) => dispatch(changeWarranty(warranty)),
  changeAvailable: (available) => dispatch(changeAvailable(available)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProducts);
