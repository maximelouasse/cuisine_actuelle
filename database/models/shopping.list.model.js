const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
           ref: 'User'
        },
    ingredients: {
        type: [{
            id_product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            checked: {
                type: Boolean
            }
        }]
    }
})

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);

module.exports = ShoppingList;