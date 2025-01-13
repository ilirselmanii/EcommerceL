import React, { useState } from 'react';
import '../../../css/Products.css';

function FilterMethodNamePurchased({ purchasedProducts, setFilteredPurchasedProducts, products }) {
  const [searchName, setSearchName] = useState('');

  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    const filteredProducts = products.filter(product =>
      product.productName.toLowerCase().includes(searchName.toLowerCase())
    );

    const filteredPurchasedProducts = purchasedProducts.filter(purchasedProduct =>
      filteredProducts.some(product => product._id === purchasedProduct.product)
    );
    
    setFilteredPurchasedProducts(filteredPurchasedProducts);
    setFilteredCount(filteredPurchasedProducts.length);
  };

  return (
    <div className='fmidMain'>
      <h2>Search by Product Name</h2>
      <input
        type='text'
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button className='fsButtons' onClick={handleSearch}>
        Search
      </button>

      {filteredCount !== null && (
        <p>{filteredCount} {filteredCount === 1 ? 'result' : 'results'} found</p>
      )}
    </div>
  );
}

export default FilterMethodNamePurchased;
