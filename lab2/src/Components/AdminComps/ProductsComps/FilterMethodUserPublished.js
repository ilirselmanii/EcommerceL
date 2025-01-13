import React, { useState } from 'react';
import '../../css/Products.css';

function FilterMethodUserPublished({ products, setFilteredProducts }) {
  const [userPublished, setUserPublished] = useState('');

  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.seller.toLowerCase().includes(userPublished.toLowerCase())
    );
    setFilteredProducts(filtered);
    setFilteredCount(filtered.length);
  };

  return (
    <div className='fmidMain'>
      <h2>Search by user who published</h2>
      <input
        type='text'
        value={userPublished}
        onChange={(e) => setUserPublished(e.target.value)}
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

export default FilterMethodUserPublished;

