/*
Import
*/
    const Models = require('../../database/models/index');
//

/*
Methods
*/
    /**
     * Save user information
     * @param body
    */
    const saveUserInformation = body => {
        return new Promise((resolve, reject) => {
            // Search user by userId
            Models.user.findById({
                _id: body.userId
            }, (error, user) => {
                if (error) return reject(error)
                else if (!user) return reject('User not exist')
                else {
                    user.name = body.name;
                    user.address = body.address;
                    user.postal_code = body.postal_code;
                    user.house_composition = body.house_composition;
                    user.allergy = body.allergy;
                    user.diet = body.diet;
                    user.not_ingredient = body.not_ingredient;
                    user.cook_level = body.cook_level;
                    user.culinary_preference = body.culinary_preference;
                    
                    user.save((error, user) => {
                        if(error) return reject(error)
                        else {
                            return resolve(user);
                        }
                    })
                };
            });

        });
    };

/*
Export
*/
    module.exports = {
        saveUserInformation
    }
//