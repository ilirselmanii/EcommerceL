import React, { useState } from 'react';
import '../../css/Products.css';

function FilterMethodQuantity({ products, setFilteredProducts }) {
  const [quantity, setQuantity] = useState('');

  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    if (quantity.trim()) {
      const filtered = products.filter(product => 
        product.productQuantity === parseInt(quantity, 10)
      );
      setFilteredProducts(filtered);
      setFilteredCount(filtered.length);
    } else {
      setFilteredProducts([]);
      setFilteredCount(0);
    }
  };

  return (
    <div className='fmidMain'>
      <h2>Search by Quantity</h2>
      <input 
        type='text' 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        placeholder='Enter quantity' 
      />
      <button className='fsButtons' onClick={handleSearch}>Search</button>
      {filteredCount !== null && (
        <p>{filteredCount} {filteredCount === 1 ? 'result' : 'results'} found</p>
      )}
    </div>
  );
}

export default FilterMethodQuantity;
