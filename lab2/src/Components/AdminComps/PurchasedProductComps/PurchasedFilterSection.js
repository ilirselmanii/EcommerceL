import React, { useState } from 'react';
import '../../css/Products.css';
import FilterMethodIDPurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodIDPurchased';
import FilterMethodNamePurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodNamePurchased';
import FilterMethodUserPublishedPurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodUserPublishedPurchased';
import FilterMethodBuyerPurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodBuyerPurchased';
import FilterMethodCategoryPurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodCategoryPurchased';
import FilterMethodDatePurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodDatePurchased';

import GeneralProductInfo from './GeneralProductInfo';

function PurchasedFilterSection({ products, setFilteredProducts, purchasedProducts, setFilteredPurchasedProducts , onRefresh }) {
  const [selectedFilter, setSelectedFilter] = useState('ID');

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const renderFilterMethod = () => {
    switch (selectedFilter) {
      case 'ID':
        return <FilterMethodIDPurchased purchasedProducts={purchasedProducts} products={products} setFilteredPurchasedProducts={setFilteredPurchasedProducts} setFilteredProducts={setFilteredProducts}/>;
      case 'Name':
        return <FilterMethodNamePurchased purchasedProducts={purchasedProducts} products={products} setFilteredPurchasedProducts={setFilteredPurchasedProducts} setFilteredProducts={setFilteredProducts}/>;
      case 'User Published':
        return <FilterMethodUserPublishedPurchased purchasedProducts={purchasedProducts} products={products} setFilteredPurchasedProducts={setFilteredPurchasedProducts} setFilteredProducts={setFilteredProducts}/>;
      case 'Buyer Purchased':
        return <FilterMethodBuyerPurchased purchasedProducts={purchasedProducts} products={products} setFilteredPurchasedProducts={setFilteredPurchasedProducts} setFilteredProducts={setFilteredProducts}/>;
      case 'Category':
        return <FilterMethodCategoryPurchased purchasedProducts={purchasedProducts} products={products} setFilteredPurchasedProducts={setFilteredPurchasedProducts} setFilteredProducts={setFilteredProducts}/>;
      case 'Date Purchased':
        return <FilterMethodDatePurchased purchasedProducts={purchasedProducts} products={products} setFilteredPurchasedProducts={setFilteredPurchasedProducts} setFilteredProducts={setFilteredProducts}/>;
      default:
        return null;
    }
  };

  return (
    <div className='filterSearch'>
      <div className='filterTitle'>
        <h1>Filter Purchased Products</h1>
        <h3 className='flTxt'>Please select a filter method</h3>
      </div>
      <div className='filterButtons'>
        <div className='rowO'>
          <button
            className={`fsButtons ${selectedFilter === 'ID' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('ID')}>
            Product ID
          </button>
          <button
            className={`fsButtons ${selectedFilter === 'Name' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('Name')}>
            Product Name
          </button>
        </div>

        <div className='rowT'>
          <button
            className={`fsButtons ${selectedFilter === 'User Published' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('User Published')}>
            User Published
          </button>
          <button
            className={`fsButtons ${selectedFilter === 'Date Published' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('Buyer Purchased')}>
            Buyer Purchased
          </button>
        </div>

        <div className='rowTh'>
          <button
            className={`fsButtons ${selectedFilter === 'Category' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('Category')}>
            Category
          </button>
          <button
            className={`fsButtons ${selectedFilter === 'Date Purchased' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('Date Purchased')}>
            Date Purchased
          </button>
        </div>
      </div>
      <div className='filterMethod'>
        {renderFilterMethod()}
      </div>

      <GeneralProductInfo  purchasedProducts={purchasedProducts} onRefresh={onRefresh} />
    </div>
  );
}

export default PurchasedFilterSection;
