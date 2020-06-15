import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductList from './components/products-list';
import EditProducts from './components/edit-products';
import CreateProducts from './components/create-products';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={ProductList} />
      <Route path="/edit/:id" component={EditProducts} />
      <Route path="/add" component={CreateProducts} />
    </Router>
  );
}

export default App;
