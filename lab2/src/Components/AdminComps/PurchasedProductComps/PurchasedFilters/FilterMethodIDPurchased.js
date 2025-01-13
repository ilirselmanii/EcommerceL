import React, { useState } from 'react';
import '../../../css/Products.css';

function FilterMethodIDPurchased({ purchasedProducts, setFilteredPurchasedProducts, products, setFilteredProducts }) {
  const [searchID, setSearchID] = useState('');

  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    const filteredPurchasedProducts = purchasedProducts.filter(purchasedProduct =>
      purchasedProduct.product.includes(searchID) || purchasedProduct._id.includes(searchID)
    );

    const filteredProducts = filteredPurchasedProducts
      .map(purchasedProduct => products.find(product => product._id === purchasedProduct.product))
      .filter(product => product !== undefined);

    setFilteredPurchasedProducts(filteredPurchasedProducts);
    setFilteredProducts(filteredProducts);

    setFilteredCount(filteredPurchasedProducts.length);
  };

  return (
    <div className='fmidMain'>
      <h2>Search by Product ID or Purchased Product ID</h2>
      <input
        type='text'
        value={searchID}
        onChange={(e) => setSearchID(e.target.value)}
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

export default FilterMethodIDPurchased;
