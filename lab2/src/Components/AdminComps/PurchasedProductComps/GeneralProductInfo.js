import React from 'react'
import AdminIcons from '../AdminIcons'
import '../../css/Products.css';

function GeneralProductInfo({ purchasedProducts, onRefresh }) {
  return (
    <div className='generalInfo'>
      <div className='giHolder'>
        <button className='giRefresh' onClick={onRefresh}>
          <p>Refresh Purchased Product List</p>
          <AdminIcons.ArrowClockwiseIcon />
        </button>  
        <div className='giTotalProducts'>
          <p>Total Products Listed:</p>
          <div>
            <AdminIcons.ProductIcon />
            <p>{purchasedProducts.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralProductInfo
