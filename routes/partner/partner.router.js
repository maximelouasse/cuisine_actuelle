/*
Imports
*/
    // Node
    const express = require('express');
    const partnerRouter = express.Router();

    // Inner
    const Mandatory = require('../../services/mandatory.service');
    const Vocabulary = require('../../services/vocabulary.service');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');
    const { checkFields } = require('../../services/request.service');
    const { createItem, addStorePartner, getPartner } = require('./partner.controller');
//

/*
Routes definition
*/
    class PartnerRouterClass {

        // Inject Passport to secure routes
        constructor() {}
        
        // Set route fonctions
        routes() {
            /**
             * POST Route to create new partner
             * @param body: Object
             * @callback => create partner
            */
            partnerRouter.post( '/', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                
                // Check fields in the body
                //const { miss, extra, ok } = checkFields( Mandatory.partner, req.body );

                //=> Error: bad fields provided
                /*if (!ok) { sendFieldsError(res, Vocabulary.errors.badFields, miss, extra) }
                else {*/
                    createItem(req.body)
                    .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                    .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
                //};
            });

            /**
             * POST Route to add store to partner
             * @param body: Object
             * @callback => add store partner
            */
            partnerRouter.post( '/:id/store', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                
                addStorePartner(req)
                .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
            });

            /**
             * GET Route to get partner by longitude / latitude
             * @param body: Object
             * @callback
            */
            partnerRouter.get( '/', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                
                getPartner(req)
                .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
            });
        };

        // Start router
        init() {
            // Get route fonctions
            this.routes();

            // Sendback router
            return partnerRouter;
        };
    };
//

/*
Export
*/
    module.exports = PartnerRouterClass;
//