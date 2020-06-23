/*
Import
*/
const opencage = require('opencage-api-client');
//

/*
Methods
*/
    /**
     * Save user information
     * @param body
    */
    const getAddressToCoordinates = body => {
        return new Promise((resolve, reject) => {
            opencage.geocode({q: body.address}).then(data => {
                if (data.status.code == 200) {
                    if (data.results.length > 0) {
                        var place = data.results[0];
                        //console.log(place.geometry);
                        return resolve(place);
                    }
                } else if (data.status.code == 402) {
                    console.log('hit free-trial daily limit');
                    console.log('become a customer: https://opencagedata.com/pricing'); 
                } else {
                    // other possible response codes:
                    // https://opencagedata.com/api#codes
                    console.log('error', data.status.message);
                }
            }).catch(error => {
                    console.log('error', error.message);
            });
        });
    };

/*
Export
*/
    module.exports = {
        getAddressToCoordinates
    }
//