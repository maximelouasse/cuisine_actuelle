/*
Imports
*/
    // Node
    const express = require('express');
    const productRouter = express.Router();

    // Inner
    const Mandatory = require('../../services/mandatory.service');
    const Vocabulary = require('../../services/vocabulary.service');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');
    const { checkFields } = require('../../services/request.service');
    const { createItem, readItem } = require('./product.controller');
//

/*
Routes definition
*/
    class ProductRouterClass {

        // Inject Passport to secure routes
        constructor() {}
        
        // Set route fonctions
        routes() {
            /**
             * POST Route to create new product
             * @param body: Object
             * @callback => create product
            */
            productRouter.post( '/', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                
                createItem(req.body)
                .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
            });

            // CRUD: Route to get all product
            productRouter.get('/', (req, res) => {
                readItem()
                .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
            })
        };

        // Start router
        init() {
            // Get route fonctions
            this.routes();

            // Sendback router
            return productRouter;
        };
    };
//

/*
Export
*/
    module.exports = ProductRouterClass;
//