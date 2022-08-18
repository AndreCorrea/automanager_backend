const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Veicle = new Schema({

    brand: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    license_plate: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    color: {
        type: String,
        required: true,
    },

    company_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },

    createAt: {
        type: Date,
        default: new Date()
    },

    updateAt: {
        type: Date,
        default: new Date()
    },

})

module.exports = mongoose.model('Veicle', Veicle);