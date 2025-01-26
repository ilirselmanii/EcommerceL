const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userProfile: { 
        type: String,
        default: 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
        required: false
    },
    userPhoneNum: { type: String, required: false, default: null },
    userPassword: { type: String, required: true },
    userDateOfCreation: { type: Date, default: Date.now },
    userDateOfUpdate: { type: Date, default: Date.now },
    userIsAdmin: { type: Boolean, default: true },
});

module.exports = mongoose.model('User', userSchema);
