import React from 'react';
import '../../css/Products.css';
import ProductCard from './ProductCard';
import AdminIcons from '../AdminIcons';

function ProductPlacement({ products, setProducts, onRefresh }) {
  return (
    <div className='productPlacement'>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            setProducts={setProducts}
            onRefresh={onRefresh}
          />
        ))
      ) : (
        <div className='noProducts'>
          <div>
            <h1>Products Not Found</h1>
            <AdminIcons.sadIcon />
          </div>
          <h3>We couldn't find a product to show you...</h3>
        </div>
      )}
    </div>
  );
}

export default ProductPlacement;
