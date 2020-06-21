const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
    name: {
        type: String
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