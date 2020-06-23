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
    const AddressRouterClass = require('./address/address.router');
    const ProductRouterClass = require('./product/product.router');
    const PartnerRouterClass = require('./partner/partner.router');
    const ShoppingListRouterClass = require('./shopping-list/shopping.list.router');
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
    const addressRouter = new AddressRouterClass();
    const productRouter = new ProductRouterClass();
    const partnerRouter = new PartnerRouterClass();
    const shoppingListRouter = new ShoppingListRouterClass();
//

/*
Configure routes
*/
    // Set API router
    apiRouter.use('/recipe', recipeRouter.init());
    apiRouter.use('/auth', authRouter.init());
    apiRouter.use('/user', userRouter.init());
    apiRouter.use('/address', addressRouter.init());
    apiRouter.use('/product', productRouter.init());
    apiRouter.use('/partner', partnerRouter.init());
    apiRouter.use('/shopping-list', shoppingListRouter.init());
    
    // Set front router
    mainRouter.use('/', frontRouter.init());
//

/*
Export
*/
    module.exports = { mainRouter };
//