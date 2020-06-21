/*
Imports
*/
    // NodeJS
    const { Router } = require('express');

    // Routers
    const FrontRouterClass = require('./front/front.router');
    const RecipeRouterClass = require('./recipe/recipe.router');
    const AuthRouterClass = require('./auth/auth.router');
    const UserRouterClass = require('./user/user.router');
//

/*
Define routers
*/
    // Parent
    const mainRouter = Router();
    const apiRouter = Router();
    mainRouter.use('/api', apiRouter);

    // Child
    const frontRouter = new FrontRouterClass();
    const recipeRouter = new RecipeRouterClass();
    const authRouter = new AuthRouterClass();
    const userRouter = new UserRouterClass();
//

/*
Configure routes
*/
    // Set API router
    apiRouter.use('/recipe', recipeRouter.init());
    apiRouter.use('/auth', authRouter.init());
    apiRouter.use('/user', userRouter.init());
    
    // Set front router
    mainRouter.use('/', frontRouter.init());
//

/*
Export
*/
    module.exports = { mainRouter };
//