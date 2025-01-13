import React, { useState } from 'react';
import '../../../css/Products.css';

function FilterMethodCategoryPurchased({ purchasedProducts, setFilteredPurchasedProducts, products }) {
  const [searchCategory, setSearchCategory] = useState('');

  const [filteredCount, setFilteredCount] = useState(null);

  const handleSearch = () => {
    const filteredProducts = products.filter(product =>
      product.productCategory.toLowerCase().includes(searchCategory.toLowerCase())
    );

    const filteredPurchasedProducts = purchasedProducts.filter(purchasedProduct =>
      filteredProducts.some(product => product._id === purchasedProduct.product)
    );

    setFilteredPurchasedProducts(filteredPurchasedProducts);
    setFilteredCount(filteredPurchasedProducts.length);
  };

  return (
    <div className='fmidMain'>
      <h2>Search by Category</h2>
      <input
        type='text'
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
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

export default FilterMethodCategoryPurchased;
