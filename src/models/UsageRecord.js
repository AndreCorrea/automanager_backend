const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsageRecord = new Schema({

    start_date: {
        type: Date,
        required: true,
    },

    finish_date: {
        type: Date,
        default: null
    },

    reason_use: {
        type: String,
        required: true,
    },

    driver_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Driver'
    },

    veicle_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Veicle'
    },

    company_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },

    using_status: {
        type: Boolean,
        default: true
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

module.exports = mongoose.model('Record', UsageRecord)