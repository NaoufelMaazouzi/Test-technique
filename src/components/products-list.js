import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { fetchProducts, deleteProducts } from '../redux/fetchProducts/fetchProductsActions';
import io from "socket.io-client";
const ENDPOINT = "localhost:5000";
let socket;

//STYLE FOR ALL TABLECELL
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#00b0ff',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 18,
    },
}))(TableCell);

//STYLE FOR ALL TABLEROW
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

//GLOBAL STYLE
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

function ProductsList({ fetchProducts, deleteProducts, products }) {
    //FETCH PRODUCTS WHEN COMPONENT IS MOUNTED
    useEffect(() => {
        fetchProducts();
    }, [])

    //LISTEN TO SERVER EMIT TO FETCH PRODUCTS & DISPLAY THEM LIVE
    socket = io(ENDPOINT);
    socket.on('serverEmit', () => {
        fetchProducts();
    })


    const classes = useStyles();
    return (
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
                        {products && products.map((currentproduct) => (
                            <StyledTableRow key={currentproduct.name}>
                                <StyledTableCell component="th" scope="row">
                                    {currentproduct.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{currentproduct.type}</StyledTableCell>
                                <StyledTableCell align="right">{currentproduct.price}</StyledTableCell>
                                <StyledTableCell align="right">{currentproduct.rating}</StyledTableCell>
                                <StyledTableCell align="right">{currentproduct.warranty_years}</StyledTableCell>
                                <StyledTableCell align="right">{currentproduct.available.toString()}</StyledTableCell>
                                <StyledTableCell align="right"><Link className={classes.linkChange} to={'/edit/' + currentproduct._id}>Modifier</Link> | <a href="#" className={classes.linkChange} onClick={() => { deleteProducts(currentproduct._id) }}>Supprimer</a></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
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
        deleteProducts: (id) => dispatch(deleteProducts(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
