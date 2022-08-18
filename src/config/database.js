const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/automanager`).then(() => {
    console.log('Conectado ao BD')
}).catch((error) => {
    console.log(error)
})