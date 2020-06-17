/*
Imports
*/
    // NodeJS
    const { Router } = require('express');
    
    // Routers
    const RecipeRouterClass = require('./recipe/recipe.router');
    const FrontRouterClass = require('./front/front.router');
//

/*
Define routers
*/
    // Parent
    const mainRouter = Router();
    const apiRouter = Router();
    mainRouter.use('/api', apiRouter);

    // Child
    const recipeRouter = new RecipeRouterClass();
    const frontRouter = new FrontRouterClass();
//

/*
Configure routes
*/
    // Set API router
    apiRouter.use('/recipe', recipeRouter.init());
    
    // Set front router
    mainRouter.use('/', frontRouter.init());
//

/*
Export
*/
    module.exports = { mainRouter };
//