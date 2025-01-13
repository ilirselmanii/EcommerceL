import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../src/Components/Pages/HomePage';
import ShopPage from '../src/Components/Pages/ShopPage';
import SingleProductPage from './Components/Pages/SingleProductPage';
import AccountPage from '../src/Components/Pages/AccountPage';
import AdminPage from '../src/Components/Pages/AdminPage';
import NoPage from './Components/Pages/NoPage';
import CartPage from './Components/Pages/CartPage';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Components/Pages/CheckoutForm';
import SuccessPage from './Components/Pages/SuccessPage';

const stripePromise = loadStripe('pk_test_51Q4mSuEefMIHC4w97hWNIlLWrx6IIZXLEe4CnelmMgP2vxSZSaedbtS82KeTVT8yMNOu4J9WwmrMiZu8sF1vjTwX00t047wz7r');

function App() {

  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/products/:productId' element={<SingleProductPage cart={cart} setCart={setCart} />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/myCart' element={<CartPage cart={cart} setCart={setCart} />} />
          <Route path='*' element={<NoPage />} />
          <Route path='/successPage' element={<SuccessPage setCart={setCart} />} />
        </Routes>
      </BrowserRouter>

      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} />
      </Elements>

    </div>
  );
}

export default App;
