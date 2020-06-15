import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Navbar() {
  const useStyles = makeStyles((theme) => ({
    // GLOBAL STYLE
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
      background: '#2A2A2A',
    },
    toolbarTitle: {
      flexGrow: 1,
      color: 'white',
    },
    link: {
      margin: theme.spacing(1, 10.5),
      textDecoration: 'none',
      fontSize: 18,
      color: '#3DB6E9',
    },
  }));

  const classes = useStyles();

  return (
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
  );
}

export default Navbar;
