import React, { useEffect, useState } from 'react';
import ProductsList from './components/ProductsList';
import './App.css';
import AuthRow from './components/Auth';
import OrderForm from './components/OrderForm';
import Product from './data/Product';

const fetchProducts = async () => {
  const response = await fetch('http://localhost:8000/api/products/');
  const products = await response.json();
  return products as Product[];
}

function App() {
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthorized(!!token);
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
      fetchProducts().then(products => {
          setProducts(products);
      });
  }, []);

  return (
    <div className="App">
      <AuthRow setIsAuthorized={setIsAuthorized} isAuthorized={isAuthorized}/>
      <h1>Online Store</h1>
      <table style={{width: "100%"}}>
        <tr>
          <td style={{width: "50%"}}><ProductsList products={products} /></td>
          {isAuthorized && <td><OrderForm products={products} /></td>}
        </tr>
      </table>

    </div>
  );
}

export default App;
