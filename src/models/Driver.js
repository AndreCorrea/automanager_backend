const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Driver = new Schema({

    name: {
        type: String,
        required: true,
        index: true
    },

    cpf: {
        type: String,
        required: true,
        index: true
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

module.exports = mongoose.model('Driver', Driver)