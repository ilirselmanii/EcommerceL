import React, { useState } from 'react';
import '../../../css/Products.css';

function FilterMethodDatePurchased({ purchasedProducts, setFilteredPurchasedProducts }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    const from = new Date(fromDate).toISOString();
    const to = new Date(toDate).toISOString();

    const filteredPurchasedProducts = purchasedProducts.filter(purchasedProduct => {
      const purchaseDate = new Date(purchasedProduct.productDateOfPurchase).toISOString();
      return purchaseDate >= from && purchaseDate <= to;
    });

    setFilteredPurchasedProducts(filteredPurchasedProducts);
    setFilteredCount(filteredPurchasedProducts.length);
  };

  return (
    <div className='fmidMain'>
      <h2>Search by Date of Purchase</h2>
      <div className='fmDate'>
        <div className='fmLeft'>
          <p>From</p>
          <input
            type='date'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className='fmRight'>
          <p>To</p>
          <input
            type='date'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>
      <button className='fsButtons' onClick={handleSearch}>
        Search
      </button>
      {filteredCount !== null && (
        <p>{filteredCount} {filteredCount === 1 ? 'result' : 'results'} found</p>
      )}
    </div>
  );
}

export default FilterMethodDatePurchased;
