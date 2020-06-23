const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
    store_name: {
        type: String
    },
    stores: {
        type: [{
            location: {
                type: {
                    type: String,
                    required: true
                },
                coordinates: {
                    type: [Number],
                    required: true
                }
            },
            address: {
                type: String
            },
            city: {
                type: String
            },
            zipcode: {
                type: String
            },
            dept_name: {
                type: String
            },
            dept: {
                type: String
            }
        }]
    },
    main_logo_url: {
        type: String
    },
    secondary_logo_url: {
        type: String
    },
    profile_picture_url: {
        type: String
    },
    cover_picture_url: {
        type: String
    },
    description: {
        type: String
    }
})

const Partner = mongoose.model('Partner', PartnerSchema);

module.exports = Partner;