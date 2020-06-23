/*
Import
*/
    const Models = require('../../database/models/index')
//

/*
Methods
*/
    /**
     * Create new partner
     * @param body
    */
    const createItem = body => {
        return new Promise((resolve, reject) => {
            Models.partner.create(body)
            .then( partner => resolve(partner) )
            .catch( err => reject(err) );
        });
    };

    /**
     * Add a new store partner
     * @param req
    */
    const addStorePartner = req => {
        return new Promise((resolve, reject) => {
            Models.partner.findOneAndUpdate({ _id: req.params.id }, { $push: { stores: req.body } })
            .then( partner => resolve(partner) )
            .catch( err => reject(err) );
        });
    };

    /**
     * Get Partner by lattitude / longitude
     * @param req
    */
    const getPartner = req => {
        let longitude = req.query.longitude,
            lattitude = req.query.lattitude;
        return new Promise((resolve, reject) => {
            Models.partner.find()
            .then( partners => {
                partners.forEach(element => {
                    if(element.stores.length > 0) {
                        element.stores.forEach((element, index, object) => {
                            distance = getDistanceFromLatLonInKm(lattitude, longitude, element.location.coordinates[1], element.location.coordinates[0]);

                            // Si la distance est supérieure à 10km
                            if(distance > 10) {
                                object.splice(index, 1);
                            }
                        });
                    }
                });
                resolve(partners);
            } )
            .catch( err => reject(err) );
        });
    };

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d
    }
      
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

/*
Export
*/
    module.exports = {
        createItem,
        addStorePartner,
        getPartner
    }
//