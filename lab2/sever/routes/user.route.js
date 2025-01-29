const express = require('express');
const router = express.Router();
const {getUsers , getUserById , createUser , updateUserById , deleteUserById, registerUser, loginUser} = require('../controllers/user.controller.js');

// GET all users
router.get('/', getUsers);

// GET a single user by ID
router.get('/:id', getUserById);

// POST a new user
router.post('/', createUser);

// PUT (update) a user by ID
router.put('/:id', updateUserById);

// DELETE a user by ID
router.delete('/:id', deleteUserById);

// POST - Register a new user
router.post('/register', registerUser);

// POST - Login a user
router.post('/login', loginUser);

module.exports = router;
