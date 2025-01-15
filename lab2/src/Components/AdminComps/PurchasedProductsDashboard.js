import React, { useState , useEffect } from 'react';
import '../css/Products.css';
import PurchasedFilterSection from './PurchasedProductComps/PurchasedFilterSection';
import PurchasedProductPlacement from './PurchasedProductComps/PurchasedProductPlacement';

function PurchasedProductsDashboard() {

  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredPurchasedProducts, setFilteredPurchasedProducts] = useState([]);

  const fetchPurchasedProducts = () => {
    fetch('http://localhost:5000/api/purchasedProducts')
      .then(response => response.json())
      .then(data => {
        setPurchasedProducts(data)
        setFilteredPurchasedProducts(data)
      })
      .catch(error => console.error('Error fetching purchased products:', error));
  };

  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); 
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchAll = () => {
    fetchPurchasedProducts();
    fetchProducts();
  };
  
  useEffect(() => {
    fetchAll();
  }, []);
  
  return (
    <div className='pHolder'>
      <div className='header'>
          <div className='title'>
            <h1>Purchased Products Dashboard</h1>
          </div>
      </div>
      <div className='mainProducts'>
        <PurchasedProductPlacement 
          products={filteredProducts} setProducts={setProducts} 
          purchasedProducts={filteredPurchasedProducts} setPurchasedProducts={setPurchasedProducts}  
          onRefresh={fetchAll}
        />
        <PurchasedFilterSection 
          products={products} setFilteredProducts={setFilteredProducts}
          purchasedProducts={purchasedProducts} setFilteredPurchasedProducts={setFilteredPurchasedProducts}  
          onRefresh={fetchAll}
        />
      </div>
    </div>
  )
}

export default PurchasedProductsDashboard
