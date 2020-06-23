/*
Imports
*/
    // Node
    const express = require('express');
    const shoppingListRouter = express.Router();

    // Inner
    const Mandatory = require('../../services/mandatory.service');
    const Vocabulary = require('../../services/vocabulary.service');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');
    const { checkFields } = require('../../services/request.service');
    const { recipeToShoppingList, getUserShoppingList } = require('./shopping.list.controller');
//

/*
Routes definition
*/
    class ShoppingListClass {

        // Inject Passport to secure routes
        constructor() {}
        
        // Set route fonctions
        routes() {
            /**
             * POST Route to add product to shopping list
             * @param body: Object
             * @callback
            */
            shoppingListRouter.post( '/', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                
                recipeToShoppingList(req.body)
                .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
            });

            /**
             * Get Route to get user shopping list
             * @param body: Object
             * @callback
            */
           shoppingListRouter.get( '/:userId', (req, res) => {
            // Check request body
            if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
            
            getUserShoppingList(req)
            .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
            .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
        });
        };

        // Start router
        init() {
            // Get route fonctions
            this.routes();

            // Sendback router
            return shoppingListRouter;
        };
    };
//

/*
Export
*/
    module.exports = ShoppingListClass;
//