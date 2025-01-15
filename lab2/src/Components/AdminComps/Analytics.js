import React, { useEffect, useState } from 'react';
import axios from 'axios';

const userIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
  </svg>
);

const productIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" fill="currentColor" className="bi bi-bag-check" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
  </svg>
);

function Analytics() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  const [totalPurchases, setTotalPurchases] = useState(0);
  const [redStoreTax, setRedStoreTax] = useState(0);

  const [stats, setStats] = useState({
    lastWeekUsers: 0,
    lastMonthUsers: 0,
    lastYearUsers: 0,
    avgProductPerDay: 0,
    avgPurchasesPerDay: 0,
  });

  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [activeUsersPercentage, setActiveUsersPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const { data: userData } = await axios.get('http://localhost:5000/api/users');
        setUsers(userData);

        // Fetch products
        const { data: productData } = await axios.get('http://localhost:5000/api/products');
        setProducts(productData);

        // Fetch purchased products
        const { data: purchasedProductData } = await axios.get('http://localhost:5000/api/purchasedProducts');
        setPurchasedProducts(purchasedProductData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0 && products.length > 0 && purchasedProducts.length > 0) {
      calculateStats(users, products, purchasedProducts);
    }
  }, [users, products, purchasedProducts]);

  const calculateStats = (users, products, purchases) => {
    const currentDate = new Date();

    // Helper function to calculate the difference in days
    const dateDiffInDays = (date1, date2) => {
      return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    };

    // Filter users by date range
    const lastWeekUsers = users.filter(user => {
      const creationDate = new Date(user.userDateOfCreation);
      return dateDiffInDays(creationDate, currentDate) <= 7;
    }).length;

    const lastMonthUsers = users.filter(user => {
      const creationDate = new Date(user.userDateOfCreation);
      return dateDiffInDays(creationDate, currentDate) <= 30;
    }).length;

    const lastYearUsers = users.filter(user => {
      const creationDate = new Date(user.userDateOfCreation);
      return dateDiffInDays(creationDate, currentDate) <= 365;
    }).length;

    // Calculate average product listings per day
    const earliestProductDate = products.length
      ? new Date(Math.min(...products.map(product => new Date(product.productDateOfListing))))
      : currentDate;
    const totalProductDays = dateDiffInDays(earliestProductDate, currentDate);
    const avgProductPerDay = products.length / (totalProductDays || 1);

    // Calculate average purchases per day
    const earliestPurchaseDate = purchases.length
      ? new Date(Math.min(...purchases.map(purchase => new Date(purchase.productDateOfPurchase))))
      : currentDate;
    const totalPurchaseDays = dateDiffInDays(earliestPurchaseDate, currentDate);
    const avgPurchasesPerDay = purchases.length / (totalPurchaseDays || 1);

    setStats({
      lastWeekUsers,
      lastMonthUsers,
      lastYearUsers,
      avgProductPerDay: avgProductPerDay.toFixed(2),
      avgPurchasesPerDay: avgPurchasesPerDay.toFixed(2),
    });
  };

  useEffect(() => {
    if (users.length > 0 && purchasedProducts.length > 0) {
      calculateActiveUsersPercentage(users, purchasedProducts);
      calculateTotalPurchases(purchasedProducts, products);
    }
  }, [users, products, purchasedProducts]);

  const calculateActiveUsersPercentage = (users, purchases, products) => {
    const usersWithPurchases = users.filter(user =>
      purchases.some(purchase => purchase.buyer === user._id)
    );
    const activeUsersCount = usersWithPurchases.length;
    const activeUsersPercentage = (activeUsersCount / users.length) * 100;
    setActiveUsersCount(activeUsersCount);
    setActiveUsersPercentage(activeUsersPercentage.toFixed(2));
  };

  const calculateTotalPurchases = (purchases, products) => {
    // Total purchases = sum of (product price * quantity) for all purchased products
    const total = purchases.reduce((sum, purchase) => {
      // Find the matching product by ID to get the price
      const product = products.find(prod => prod._id === purchase.product);
      
      if (product) {
        return sum + (product.productPrice * purchase.quantityPurchased);
      }
      return sum;
    }, 0);
    
    const redStoreTax = total * 0.2; // Calculate 20% tax

    setTotalPurchases(total.toFixed(2)); // Format to 2 decimal places
    setRedStoreTax(redStoreTax.toFixed(2)); // Format to 2 decimal places
  };

  return (
    <div className='anMain'>
      <div className='anTitle'>
        <h1>Analytics</h1>
      </div>
      <div className='anRow1'>
        <div className='anUsers'>
          <p>Total user accounts registered:</p>
          <div>
            <p>{userIcon}</p>
            <h1>{users.length}</h1>
          </div>
        </div>
        <div className='anProd'>
          <p>Total products listed:</p>
          <div>
            <p>{productIcon}</p>
            <h1>{products.length}</h1>
          </div>
        </div>
      </div>
      <div className='anRow2'>
        <div className='anData'>
            <h2>Accounts created last week: {stats.lastWeekUsers}</h2>
          <h2>Accounts created last month: {stats.lastMonthUsers}</h2>
          <h2>Accounts created last year: {stats.lastYearUsers}</h2>
          <h2>Average product listing per day: {stats.avgProductPerDay}</h2>
          <h2>Average purchases per day: {stats.avgPurchasesPerDay}</h2>
        </div>
        <div className='anFinance'>
          <div className='anGraph'>
            <div className='anInGraph' style={{height: `${activeUsersPercentage}%`}}>
            </div>
          </div>
          <div className='anLeg'>
            <div className='leg1'>
              <div className='legBox'></div>
              <p>Total users: {users.length}</p>
            </div>
            <div className='leg2'>
              <div className='legBox'></div>
              <p>Total Active users: {activeUsersCount} ({activeUsersPercentage}%)</p>
            </div>
          </div>
          <div className='anGraph1'>
            <div className='anInGraph1'>
            </div>
          </div>
          <div className='anLeg'>
            <div className='leg3'>
              <div className='legBox'></div>
              <p>Total Purchases: ${totalPurchases}</p>
            </div>
            <div className='leg4'>
              <div className='legBox'></div>
              <p>RedStore tax (20%): ${redStoreTax}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
