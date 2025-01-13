import React, { useState } from 'react';
import '../../css/Products.css';

function FilterMethodName({ products, setFilteredProducts }) {
  const [searchName, setSearchName] = useState('');
  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredProducts(filtered);
    setFilteredCount(filtered.length);
  };

  return (
    <div className='fmidMain'>
      <h2>Type Product Name</h2>
      <input 
        type='text' 
        value={searchName} 
        onChange={(e) => setSearchName(e.target.value)} 
      />
      <button className='fsButtons' onClick={handleSearch}>Search</button>
      {filteredCount !== null && (
        <p>{filteredCount} {filteredCount === 1 ? 'result' : 'results'} found</p>
      )}
    </div>
  );
}

export default FilterMethodName;
