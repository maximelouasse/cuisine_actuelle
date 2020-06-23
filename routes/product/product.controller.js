/*
Import
*/
    const Models = require('../../database/models/index')
//

/*
Methods
*/
    /**
     * Create new product
     * @param body
    */
    const createItem = body => {
        return new Promise((resolve, reject) => {
            Models.product.create(body)
            .then( product => resolve(product) )
            .catch( err => reject(err) );
        });
    };

    /**
     * Read all product
     * @param body
    */
    const readItem = (req) => {
        return new Promise( (resolve, reject) => {
            Models.product.find( (err, collection) => {
                err ? reject(err) : resolve(collection);
            }).populate('partner')
        })
    }

/*
Export
*/
    module.exports = {
        createItem,
        readItem
    }
//