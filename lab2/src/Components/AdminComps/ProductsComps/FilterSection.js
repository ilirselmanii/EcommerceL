import React, { useState } from 'react';
import '../../css/Products.css';
import FilterMethodCategory from './FilterMethodCategory';
import FilterMethodDatePublished from './FilterMethodDatePublished';
import FilterMethodQuantity from './FilterMethodQuantity';
import FilterMethodID from './FilterMethodID';
import FilterMethodName from './FilterMethodName';
import FilterMethodUserPublished from './FilterMethodUserPublished';
import GeneralProductInfo from './GeneralProductInfo';

function FilterSection({ products, setFilteredProducts, onRefresh }) {
  const [selectedFilter, setSelectedFilter] = useState('ID');

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const renderFilterMethod = () => {
    switch (selectedFilter) {
      case 'ID':
        return <FilterMethodID products={products} setFilteredProducts={setFilteredProducts} />;
      case 'Name':
        return <FilterMethodName products={products} setFilteredProducts={setFilteredProducts} />;
      case 'User Published':
        return <FilterMethodUserPublished products={products} setFilteredProducts={setFilteredProducts} />;
      case 'Date Published':
        return <FilterMethodDatePublished products={products} setFilteredProducts={setFilteredProducts} />;
      case 'Category':
        return <FilterMethodCategory products={products} setFilteredProducts={setFilteredProducts} />;
      case 'Date Purchased':
        return <FilterMethodQuantity products={products} setFilteredProducts={setFilteredProducts} />;
      default:
        return null;
    }
  };

  return (
    <div className='filterSearch'>
      <div className='filterTitle'>
        <h1>Filter Products</h1>
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
            onClick={() => handleFilterClick('Date Published')}>
            Date Published
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
            Quantity
          </button>
        </div>
      </div>
      <div className='filterMethod'>
        {renderFilterMethod()}
      </div>

      <GeneralProductInfo products={products} onRefresh={onRefresh} />
    </div>
  );
}

export default FilterSection;
