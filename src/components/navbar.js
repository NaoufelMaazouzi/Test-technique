import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css';
//import { Box, Typography, Button, IconButton } from "@material-ui/core";
//import MenuIcon from "@material-ui/core/Menu";


import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useState } from 'react';

function Navbar() {
    const [open, setOpen] = useState(false);

    const useStyles = makeStyles((theme) => ({
        '@global': {
            ul: {
                margin: 0,
                padding: 0,
                listStyle: 'none',
            },
        },
        appBar: {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        toolbar: {
            flexWrap: 'wrap',
            background: '#2A2A2A'
        },
        toolbarTitle: {
            flexGrow: 1,
            color: 'white'
        },
        link: {
            margin: theme.spacing(1, 10.5),
            textDecoration: 'none',
            fontSize: 18,
            color: '#3DB6E9'
        },
    }));

    const classes = useStyles();

    return (
        /* <nav className="navbar">
             <div className={open ? "hamburger active icon" : "hamburger icon"} onClick={() => setOpen(!open)}>
                 <div className="line"></div>
             </div>
             <div className="div-logo-navbar">
                 <Link to="/" className="navbarLogo">Products Tracker</Link>
             </div>
 
             <ul className={open ? "nav-links open" : "nav-links"}>
                 <li className={open ? "fade" : ""}>
                     <Link to="/">Produits</Link>
                 </li>
                 <li className={open ? "fade" : ""}>
                     <Link to="/add">Créer un produit</Link>
                 </li>
             </ul>
         </nav >*/

        /*<Box display="flex" bgcolor="grey.500" p={5} alignItems="center" className={classes.navbar}>
            <Typography>Test Naoufel</Typography>
            <Box>
                <Button color="primary"><Link to="/">Produits</Link></Button>
                <Button color="primary"><Link to="/add">Créer un produit</Link></Button>
            </Box>
            <Box flexGrow={1} textAlign="right">
                <IconButton>
                    <MenuIcon />
                </IconButton>
            </Box>
        </Box>*/


        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    Test technique Naoufel
          </Typography>
                <nav>
                    <Link variant="button" color="textPrimary" href="#" className={classes.link} to="/">Produits</Link>
                    <Link variant="button" color="textPrimary" href="#" className={classes.link} to="/add">Créer un produit</Link>
                </nav>
            </Toolbar>
        </AppBar>
    )
}


export default Navbar;