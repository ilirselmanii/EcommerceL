import React, { useState, useEffect } from 'react';
import '../css/Products.css';
import FilterSection from './ProductsComps/FilterSection';
import ProductPlacement from './ProductsComps/ProductPlacement';

function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); 
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='pHolder'>
      <div className='header'>
        <div className='title'>
          <h1>Products Dashboard</h1>
        </div>
      </div>
      <div className='mainProducts'>
        <ProductPlacement products={filteredProducts} setProducts={setProducts} onRefresh={fetchProducts} />
        <FilterSection products={products} setFilteredProducts={setFilteredProducts} onRefresh={fetchProducts} />
      </div>
    </div>
  );
}

export default ProductsDashboard;
