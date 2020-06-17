/*
Imports
*/
    // Nodes
    const express = require('express');
    const myRouter = express.Router();

    // Modules
    /*const { checkFields } = require('../../services/request.checker');
    const Mandatories = require('../../services/mandatory.service');*/
    const { getAllRecipes, getRecipeById } = require('./recipe.controller');
//

/*
Routes definition
*/
    class RecipeRouterClass {

        // Inject passport in the class
        constructor() {}

        routes() {
            myRouter.get('/', (req, res) => {
                getAllRecipes()
                .then( apiResponse => {
                    return res.status(200).json({
                        message: 'Data sended',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Data not sended',
                        data: null,
                        err: apiResponse
                    })
                })
            })

            myRouter.get('/:id', (req, res) => {
                getRecipeById(req)
                .then( apiResponse => {
                    return res.status(200).json({
                        message: 'Data sended',
                        data: apiResponse,
                        err: null
                    })
                })
                .catch( apiResponse => {
                    return res.status(400).json({
                        message: 'Data not sended',
                        data: null,
                        err: apiResponse
                    })
                })
            })
        }

        init() {
            // Get route fonctions
            this.routes();

            // Sendback router
            return myRouter;
        }
    }
//

/*
Export
*/
    module.exports = RecipeRouterClass;
//