const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: false,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, "is invalid"],
        index: true
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    postal_code: {
        type: String
    },
    house_composition: {
        type: { adult: Number, child: Number}
    },
    allergy: {
        type: [{
            type: String
        }]
    },
    diet: {
        type: [{
            type: String
        }]
    },
    not_ingredient: {
        type: [{
            type: String
        }]
    },
    cook_level: {
        type: Number
    },
    culinary_preference: {
        type: [{
            type: String
        }]
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;