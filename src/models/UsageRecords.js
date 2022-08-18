const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsageRecord = new Schema({

    start_date: {
        type: String,
        required: true,
    },

    finish_date: {
        type: String,
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

    car_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Car'
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

module.exports = mongoose.model('Record', UsageRecord);