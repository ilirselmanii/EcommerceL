import React, { useState } from 'react';
import '../../css/Products.css';

function FilterMethodDatePublished({ products, setFilteredProducts }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    if (startDate && endDate) {
      const filtered = products.filter(product => {
        const productDate = new Date(product.productDateOfListing);
        return productDate >= new Date(startDate) && productDate <= new Date(endDate);
      });
      setFilteredProducts(filtered);
      setFilteredCount(filtered.length);
    } else {
      setFilteredProducts([]);
      setFilteredCount(0);
    }
  };

  return (
    <div className='fmidMain'>
      <h2>Search Date of Publish</h2>
      <div className='fmDate'>
        <div className='fmLeft'>
          <p>From</p>
          <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className='fmRight'>
          <p>To</p>
          <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
      <button className='fsButtons' onClick={handleSearch}>Search</button>
      {filteredCount !== null && (
        <p>{filteredCount} {filteredCount === 1 ? 'result' : 'results'} found</p>
      )}
    </div>
  );
}

export default FilterMethodDatePublished;
