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
    const { register, confirmIdentity, login, me } = require('./auth.controller');
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
            authRouter.post( '/register', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                
                // Check fields in the body
                const { miss, extra, ok } = checkFields( Mandatory.register, req.body );

                //=> Error: bad fields provided
                if (!ok) { sendFieldsError(res, Vocabulary.errors.badFields, miss, extra) }
                else {
                    //=> Request is valid: use controller
                    register(req.body)
                    .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                    .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
                };
            });

            /**
             * POST Route to validate user
             * @param body: Object => _id: String, password: String
             * @callback => change user.isValidated to 'true'
            */
            authRouter.post( '/user-validation', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                // Check fields in the body
                const { miss, extra, ok } = checkFields( Mandatory.idValidation, req.body );
                
                //=> Error: bad fields provided
                if (!ok) { sendFieldsError(res, Vocabulary.errors.badFields, miss, extra) }
                else {
                    //=> Request is valid: use controller
                    confirmIdentity(req.body)
                    .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                    .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse) );
                };
            });

            /**
             * POST Route to login user
             * @param body: Object => email: String
             * @callback => send user _id and date informations
            */
            authRouter.post( '/login', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                
                // Check fields in the body
                const { miss, extra, ok } = checkFields( Mandatory.login, req.body );

                //=> Error: bad fields provided
                if (!ok) { sendFieldsError(res, Vocabulary.errors.badFields, miss, extra) }
                else {
                    //=> Request is valid: use controller
                    login(req.body, res)
                    .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                    .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse) );
                };
            });

            /**
             * POST Route to get user
             * @param body: Object => id: String
             * @callback
            */
            authRouter.post( '/me', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                // Check fields in the body
                const { miss, extra, ok } = checkFields( Mandatory.me, req.body );

                //=> Error: bad fields provided
                if (!ok) { sendFieldsError(res, Vocabulary.errors.badFields, miss, extra) }
                else {
                    //=> Request is valid: use controller
                    me(req.body, res)
                    .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                    .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse) );
                };
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