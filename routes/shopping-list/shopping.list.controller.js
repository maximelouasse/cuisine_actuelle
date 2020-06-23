/*
Import
*/
    // Angular
    const fs = require('fs');

    // Inner
    const Models = require('../../database/models/index');
const { shopping_list, product } = require('../../database/models/index');
const { populate } = require('../../database/models/user.model');
    
    // Files
    const recipesFolder = './recipes';
//

/*
Methods
*/
    /**
     * Add ingredients recipe to shopping list
     * @param body
    */
    const recipeToShoppingList = body => {
        return new Promise((resolve, reject) => {
            Models.shopping_list.findOne({user: body.userId}, (err, shopping_list) => {
                // Shopping List Already Exist
                if(shopping_list) {
                    result = pushProductToShoppingList(shopping_list._id, body.recipeId);

                    if(result) {
                        Models.shopping_list.findOne({ _id: shopping_list._id }, (err, shopping_list) => {
                            if(err) reject(err)
                            else {
                                resolve(shopping_list)
                            }
                        })
                    }
                } else {
                    Models.shopping_list.create({ user: body.userId }, (error, shopping_list) => {
                        if(error) return reject(error)
                        else {
                            result = pushProductToShoppingList(shopping_list._id, body.recipeId);

                            if(result) {
                                Models.shopping_list.findOne({ _id: shopping_list._id }, (err, shopping_list) => {
                                    if(err) reject(err)
                                    else {
                                        resolve(shopping_list)
                                    }
                                })
                            }
                        }
                    });
                }
            })
        });
    };

    function pushProductToShoppingList(listId, recipeId) {
        let pathFile = recipesFolder + '/' + recipeId + '.json';

        if (fs.existsSync(pathFile)) {
            console.log('FILE EXIST');
            let rawData = fs.readFileSync(pathFile);
            let jsonData = JSON.parse(rawData);
            let recipeIngredients = jsonData.parsedIngredients.split_ingredients[0].ingredients;
            let result = true;

            if(recipeIngredients.length > 0) {
                recipeIngredients.forEach(element => {
                    Models.product.findOne({
                        name: new RegExp(element.referenceIngredient, 'i')
                    }, (err, product) => {
                        if(product) {
                            Models.shopping_list.findOne({ _id: listId }, (err, shopping) => {
                                shopping.ingredients.push({'product': product._id, 'quantity': 1, 'checked': true});
                                if(shopping.save()) {
                                    result = true;
                                } else {
                                    return false;
                                }
                            })
                        }
                    })
                });
            }

            return result;
        }
    }

    const getUserShoppingList = req => {
        let userShoppingList = {};

        return new Promise((resolve, reject) => {
            Models.shopping_list.findOne({ user: req.params.userId }, (err, shopping_list) => {                
                if(shopping_list.ingredients.length > 0) {
                    shopping_list.ingredients.forEach((product, index) => {
                        Models.product.findById({ _id: product.product._id }, (err, document) => {
                            userShoppingList.ingredients.push(document);
                        })
                        .populate('partner')
                    });
                }
                resolve(shopping_list);
            })
            .populate('ingredients.product')
        });
    }

/*
Export
*/
    module.exports = {
        recipeToShoppingList,
        getUserShoppingList
    }
//