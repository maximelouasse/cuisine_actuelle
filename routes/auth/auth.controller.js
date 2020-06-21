/*
Import
*/
    const Models = require('../../database/models/index')
    const bcrypt = require('bcryptjs');
//

/*
Methods
*/
    /**
     * Register new identity and user
     * @param body => email: String (unique)
    */
    const register = body => {
        return new Promise((resolve, reject) => {
            // Search user by email
            Models.user.findOne({
                email: body.email
            }, (error, user) => {
                if (error) return reject(error)
                else if (user) return reject('Identity already exist')
                else {
                    // Set creation and connection date
                    body.creationDate = new Date();
                    body.lastConnection = null;
                    body.isValidated = true;

                    // Register new user
                    Models.user.create(body, (error, user) => {
                        if(error) return reject(error)
                        else {
                            return resolve(user);
                        }
                    })
                };
            });

        });
    };

    /**
     * Confirm user identity before login
     * @param body: Object => _id: String, password: String
    */
    const confirmIdentity = body => {
        return new Promise( (resolve, reject) => {
            // Search user by email
            Models.user.findById( body._id, (error, user) => {
                if(error) return reject(error)
                else if(!user) return reject('Unknow identity')
                else {
                    // Check password
                    const validPassword = bcrypt.compareSync(body.password, user.password);
                    if( !validPassword ) return reject('Password not valid')
                    else {
                        // Change identity state
                        user.isValidated = true;

                        // Save identuty state
                        user.save()
                        .then( mongoResponse => resolve(mongoResponse) )
                        .catch( mongoResponse => reject(mongoResponse) )
                    };
                }
            } )
        })
    };

    /**
     * Login user
     * @param body: Object => email: String
    */
    const login = (body, res) => {
        return new Promise( (resolve, reject) => {
            // Search user by email
            Models.user.findOne( { email: body.email }, (error, user) => {
                if(error) reject(error)
                else if(!user) reject('Unknow identity')
                else {
                    // Set cookie
                    // res.cookie(process.env.COOKIE_NAME, user.generateJwt(user._id), { httpOnly: true });
                    
                    // Define user last connection
                    const lastConnection = user.lastConnexion;

                    // Set user new connection
                    user.lastConnexion = new Date();

                    // Save new connection
                    user.save( (error, user) => {
                        if(error) return reject(error)
                        else {
                            return resolve(user);
                        };
                    });
                };
            });
        });
    };

    /**
     * Get user
     * @param body: Object => email: String
    */
    const me = (body, res) => {
        return new Promise( (resolve, reject) => {
            // Search user by email
            Models.user.findById( body.id, (error, user) => {
                if(error) reject(error)
                else if(!user) reject('Unknow identity')
                else { resolve(user); };
            });
        });
    };

/*
Export
*/
    module.exports = {
        register,
        confirmIdentity,
        login,
        me
    }
//