/*
Imports
*/
    // Node
    const express = require('express');
    const addressRouter = express.Router();

    // Inner
    const Vocabulary = require('../../services/vocabulary.service');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');
    const { checkFields } = require('../../services/request.service');
    const { getAddressToCoordinates } = require('./address.controller');
//

/*
Routes definition
*/
    class AddressRouterClass {

        // Inject Passport to secure routes
        constructor() {}
        
        // Set route fonctions
        routes() {
            /**
             * POST Route to get coordinates from address
             * @param body:
             * @callback
            */
           addressRouter.post( '/forward', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };

                getAddressToCoordinates(req.body)
                .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
            });
        };

        // Start router
        init() {
            // Get route fonctions
            this.routes();

            // Sendback router
            return addressRouter;
        };
    };
//

/*
Export
*/
    module.exports = AddressRouterClass;
//