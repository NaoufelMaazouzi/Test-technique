import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';


import ProductList from "./components/products-list";
import EditProducts from './components/edit-products';
import CreateProducts from './components/create-products';
import Navbar from "./components/navbar";
/*import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";*/


function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' exact component={ProductList} />
      <Route path='/edit/:id' component={EditProducts} />
      <Route path='/add' component={CreateProducts} />
      {/*<Route path='/edit/:id' component={EditExercise} />
      <Route path='/create' component={CreateExercise} />
  <Route path='/user' component={CreateUser} />*/}
    </Router>
  );
}

export default App;
