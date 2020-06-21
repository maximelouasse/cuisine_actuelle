/*
Imports
*/
    // Node
    const express = require('express');
    const authRouter = express.Router();

    // Inner
    const Mandatory = require('../../services/mandatory.service');
    const Vocabulary = require('../../services/vocabulary.service');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');
    const { checkFields } = require('../../services/request.service');
    const { saveUserInformation } = require('./user.controller');
//

/*
Routes definition
*/
    class AuthRouterClass {

        // Inject Passport to secure routes
        constructor() {}
        
        // Set route fonctions
        routes() {
            /**
             * POST Route to create new user
             * @param body: Object => email: String (unique)
             * @callback => create user and associated user
            */
            authRouter.post( '/save', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };

                saveUserInformation(req.body)
                .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
            });
        };

        // Start router
        init() {
            // Get route fonctions
            this.routes();

            // Sendback router
            return authRouter;
        };
    };
//

/*
Export
*/
    module.exports = AuthRouterClass;
//