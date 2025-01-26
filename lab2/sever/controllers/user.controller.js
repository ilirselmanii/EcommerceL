require('dotenv').config();
const User = require('../models/user.model.schema.js');
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY_LAB2;

// GET all users
const getUsers = async (req, res) => {
    try {   
        const users = await User.find({}).lean();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// GET single user
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).lean();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE usr
const createUser = async (req, res) => {
    try {
        // Check for existing user by email
        const existingUser = await User.findOne({ userEmail: req.body.userEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.userPassword, salt);

        // Create a new user object with the hashed password
        const userData = {
            ...req.body, // Spread the rest of the req.body
            userPassword: hashedPassword // Replace the password with the hashed version
        };

        // Create the new user
        const user = await User.create(userData);

        res.status(201).json({ message: 'User created successfully', user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE user
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const filter = { _id: id };
        const updatedUser = await User.findOneAndUpdate(filter, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELLET user
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const filter = { _id: id };

        const user = await User.findByIdAndDelete(filter);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({ message: `User with ID ${id} has been deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerUser = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    try {
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        const newUser = new User({
            userName,
            userEmail,
            userPassword: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN a user
const loginUser = async (req, res) => {
    const { userName, userPassword } = req.body; 

    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    registerUser,
    loginUser,
};
