const express = require('express');
const router = express.Router();
const {getPurchasedProducts , getPurchasedProductById , createPurchasedProduct , updatePurchasedProductById , deletePurchasedProductById} = require('../controllers/purchasedProduct.controller.js');

// GET all users
router.get('/', getPurchasedProducts);

// GET a single user by ID
router.get('/:id', getPurchasedProductById);

// POST a new user
router.post('/', createPurchasedProduct);

// PUT (update) a user by ID
router.put('/:id', updatePurchasedProductById);

// DELETE a user by ID
router.delete('/:id', deletePurchasedProductById);

module.exports = router;
