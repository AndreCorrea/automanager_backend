const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = new Schema({

    fantasy_name: {
        type: String,
        required: true
    },

    corporate_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    cnpj: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    password: {
        type: String,
        required: true
    },

    token: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    status: {
        type: String,
        required: true,
        default: 'ativo', // Apenas para motivos de testes. Normalmente, inicia-se "pendente".
        enum: ['pendente', 'ativo', 'desativado']
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

module.exports = mongoose.model('Company', Company);