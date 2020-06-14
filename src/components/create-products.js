import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import io from "socket.io-client";
const ENDPOINT = "localhost:5000";

let socket;

function CreateProducts(props) {

    const [name, setName] = useState();
    const [type, setType] = useState();
    const [price, setPrice] = useState();
    const [rating, setRating] = useState();
    const [warranty_years, setWarranty_years] = useState();
    const [available, setAvailable] = useState();

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
            marginTop: 60
        }
    }));


    useEffect(() => {
        axios.get('http://localhost:5000/products/')
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

        /* axios.get('http://localhost:5000/users/')
             .then(response => {
                 if (response.data.length > 0) {
                     setUsers(response.data.map(user => user.username))
                 }
             })
             .catch((err) => {
                 console.log(err);
             })*/
    }, [])

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



        axios.post('http://localhost:5000/products/add', product)
            .then(res => console.log(res.data))
            .catch((err) => {
                console.log(err);
            })

        window.location = '/'

    }

    const classes = useStyles();

    return (
        <div className="container">
            <h1 className={classes.title}>Créer un produit</h1>

            <form className={classes.root} noValidate autoComplete="off" onSubmit={onsubmit}>
                <TextField id="outlined-basic" label="Nom" variant="outlined" value={name} onChange={onChangeName} />
                <TextField id="outlined-basic" label="Type" variant="outlined" value={type} onChange={onChangeType} />
                <TextField type="number" id="outlined-basic" label="Prix" variant="outlined" value={price} onChange={onChangePrice} />
                <TextField id="outlined-basic" label="Note" variant="outlined" value={rating} onChange={onChangeRating} />
                <TextField type="number" id="outlined-basic" label="Garantie" variant="outlined" value={warranty_years} onChange={onChangeWarranty_years} />
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
                <input type="submit" className="from-control" value="Créer le produit" />
            </form>
        </div>
    )
}


export default CreateProducts;
