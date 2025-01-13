import React, { useState } from 'react';
import '../../../css/Products.css';

function FilterMethodBuyerPurchased({ purchasedProducts, setFilteredPurchasedProducts }) {
  const [searchBuyer, setSearchBuyer] = useState('');

  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    const filteredPurchasedProducts = purchasedProducts.filter(purchasedProduct =>
      purchasedProduct.buyer.toLowerCase().includes(searchBuyer.toLowerCase())
    );

    setFilteredPurchasedProducts(filteredPurchasedProducts);
    setFilteredCount(filteredPurchasedProducts.length);
  };

  return (
    <div className='fmidMain'>
      <h2>Search by Buyer</h2>
      <input
        type='text'
        value={searchBuyer}
        onChange={(e) => setSearchBuyer(e.target.value)}
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

export default FilterMethodBuyerPurchased;
