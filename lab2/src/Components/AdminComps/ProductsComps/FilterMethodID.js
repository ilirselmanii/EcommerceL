import React, { useState } from 'react';
import '../../css/Products.css';

function FilterMethodID({ products, setFilteredProducts }) {
  const [searchID, setSearchID] = useState('');

  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    const filtered = products.filter(product => product._id.includes(searchID));
    setFilteredProducts(filtered);
    setFilteredCount(filtered.length);
};

  return (
    <div className='fmidMain'>
      <h2>Type Product ID</h2>
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

export default FilterMethodID;
