import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import SmallPurchasedProduct from './SmallPurchasedProduct';

function AccountHistory() {
  const [refinedPurchasedProducts, setRefinedPurchasedProducts] = useState([]);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const { data: purchasedProducts } = await axios.get('http://localhost:5000/api/purchasedProducts');
        const userPurchasedProducts = purchasedProducts.filter(purchase => purchase.buyer === userId);

        const productIds = userPurchasedProducts.map(purchase => purchase.product);
        const { data: allProducts } = await axios.get('http://localhost:5000/api/products');
        const userPurchasedProductInfo = allProducts.filter(product => productIds.includes(product._id));

        const sellerIds = userPurchasedProductInfo.map(product => product.seller);
        const { data: allUsers } = await axios.get('http://localhost:5000/api/users');
        const userFilteredInfo = allUsers.filter(user => sellerIds.includes(user._id));

        const refinedPurchasedProducts = userPurchasedProducts.map(purchase => {
          const product = userPurchasedProductInfo.find(p => p._id === purchase.product);
          const seller = product ? userFilteredInfo.find(u => u._id === product.seller) : null;

          if (!product || !seller) {
            console.error('Missing product or seller info for purchase:', purchase);
            return null;
          }

          return {
            product,
            seller,
            purchaseDate: purchase.productDateOfPurchase,
            quantityPurchased: purchase.quantityPurchased,
            pricePerProduct: product.productPrice
          };
        }).filter(purchase => purchase !== null);

        setRefinedPurchasedProducts(refinedPurchasedProducts);

      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchPurchasedProducts();
  }, []);

  return (
    <div className='ppHolder'>
      {refinedPurchasedProducts.length > 0 ? (
        refinedPurchasedProducts.map((purchase, index) => (
          <SmallPurchasedProduct
            key={index}
            product={purchase.product}
            seller={purchase.seller}
            datePurchased={purchase.purchaseDate}
            quantityPurchased={purchase.quantityPurchased}
            pricePerProduct={purchase.pricePerProduct}
          />
        ))
      ) : (
        <p>No purchase history available.</p>
      )}
    </div>
  );
}

export default AccountHistory;
