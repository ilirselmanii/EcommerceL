import React, { useState } from 'react';
import '../../../css/Products.css';

function FilterMethodUserPublishedPurchased({ purchasedProducts, setFilteredPurchasedProducts, products }) {
  const [searchUser, setSearchUser] = useState('');

  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    const filteredProducts = products.filter(product =>
      product.seller.toLowerCase().includes(searchUser.toLowerCase())
    );

    const filteredPurchasedProducts = purchasedProducts.filter(purchasedProduct =>
      filteredProducts.some(product => product._id === purchasedProduct.product)
    );

    setFilteredPurchasedProducts(filteredPurchasedProducts);
    setFilteredCount(filteredPurchasedProducts.length);
  };

  return (
    <div className='fmidMain'>
      <h2>Search by Publisher</h2>
      <input
        type='text'
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
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

export default FilterMethodUserPublishedPurchased;
