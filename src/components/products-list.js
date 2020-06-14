import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import io from "socket.io-client";
const ENDPOINT = "localhost:5000";

let socket;

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#00b0ff',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 18,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    linkChange: {
        textDecoration: 'none',
        color: '#008ECA'
    },
    title: {
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30
    }
});

/*const Product = props => (
    <tr>
        <td>{props.product.name}</td>
        <td>{props.product.type}</td>
        <td>{props.product.price}</td>
        <td>{props.product.rating}</td>
        <td>{props.product.warranty_years}</td>
        <td>{props.product.available}</td>
        <td>
            <Link className="linkChange" to={'/edit/' + props.product._id}>Modifier</Link> | <a href="#" className="linkChange" onClick={() => { props.deleteProduct(props.product._id) }}>Supprimer</a>
        </td>
    </tr>
)*/

function ProductsList() {
    const [products, setProducts] = useState([])

    const [response, setResponse] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch((err) => {
                console.log(err);
            })



    }, [ENDPOINT])

    function deleteProduct(id) {
        socket = io(ENDPOINT);

        socket.emit('deleteProducts');

        axios.delete('http://localhost:5000/products/' + id)
            .then(res => console.log(res.data))
            .catch((err) => {
                console.log(err)
            })
        setProducts(products.filter(el => el._id !== id))


    }

    /* function productList() {
         return products.map(currentproduct => {
             return <Product product={currentproduct} deleteProduct={deleteProduct} key={currentproduct._id} />
         })
     }*/

    socket = io(ENDPOINT);

    socket.on('serverEmit', () => {
        console.log("return emit");
        axios.get('http://localhost:5000/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    })

    const classes = useStyles();
    return (

        /*<div className="container" >
            <h1>{products.map(currentproduct =>
                currentproduct.name
            )}</h1>
        </ div>*/


        /*<div className="container">
            <h3>Tous les éxercices</h3>
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th>Nom</th>
                        <th>Type</th>
                        <th>Prix</th>
                        <th>Note</th>
                        <th>Garantie</th>
                        <th>Disponibilité</th>
                    </tr>
                </thead>
                <tbody>
                    {productList()}
                </tbody>
            </table>
        </div>*/
        <React.Fragment>
            <h1 className={classes.title}>Tous les produits</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nom</StyledTableCell>
                            <StyledTableCell align="right">Type</StyledTableCell>
                            <StyledTableCell align="right">Prix</StyledTableCell>
                            <StyledTableCell align="right">Note</StyledTableCell>
                            <StyledTableCell align="right">Garantie</StyledTableCell>
                            <StyledTableCell align="right">Disponiblité</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((currentproduct) => (
                            <StyledTableRow key={currentproduct.name}>
                                <StyledTableCell component="th" scope="row">
                                    {currentproduct.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{currentproduct.type}</StyledTableCell>
                                <StyledTableCell align="right">{currentproduct.price}</StyledTableCell>
                                <StyledTableCell align="right">{currentproduct.rating}</StyledTableCell>
                                <StyledTableCell align="right">{currentproduct.warranty_years}</StyledTableCell>
                                <StyledTableCell align="right">{currentproduct.available.toString()}</StyledTableCell>
                                <StyledTableCell align="right"><Link className={classes.linkChange} to={'/edit/' + currentproduct._id}>Modifier</Link> | <a href="#" className={classes.linkChange} onClick={() => { deleteProduct(currentproduct._id) }}>Supprimer</a></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}


export default ProductsList;