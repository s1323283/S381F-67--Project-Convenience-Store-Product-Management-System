const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    productName: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    BestBeforeDate: {
        required: true,
        type: String
    }
})
module.exports = mongoose.model('Data', dataSchema)