import React from 'react';
import AdminIcons from '../AdminIcons';
import '../../css/Products.css';

function GeneralProductInfo({ products, onRefresh }) {
  return (
    <div className='generalInfo'>
      <div className='giHolder'>
        <button className='giRefresh' onClick={onRefresh}>
          <p>Refresh Product List</p>
          <AdminIcons.ArrowClockwiseIcon />
        </button>  
        <div className='giTotalProducts'>
          <p>Total Products Listed:</p>
          <div>
            <AdminIcons.ProductIcon />
            <p>{products.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralProductInfo;
