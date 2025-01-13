import React from 'react';
import '../../css/Products.css';
import PurchasedProductCard from './PurchasedProductCard';
import AdminIcons from '../AdminIcons';

function PurchasedProductPlacement({ products, purchasedProducts, setProducts, setPurchasedProducts, onRefresh }) {
  return (
    <div className='productPlacement'>
      {purchasedProducts.length > 0 ? (
        purchasedProducts.map((purchasedProduct) => {
          // Find the corresponding product data
          const product = products.find(p => p._id === purchasedProduct.product);

          return (
            <PurchasedProductCard
              key={purchasedProduct._id}
              product={product}
              purchasedProduct={purchasedProduct}
              setProducts={setProducts}
              setPurchasedProducts={setPurchasedProducts}
              onRefresh={onRefresh}
            />
          );
        })
      ) : (
        <div className='noProducts'>
          <div>
            <h1>Purchased Products Not Found</h1>
            {/* Assuming there's a sad icon in AdminIcons */}
            <AdminIcons.sadIcon />
          </div>
          <h3>We couldn't find a purchased product to show you...</h3>
        </div>
      )}
    </div>
  );
}

export default PurchasedProductPlacement;
