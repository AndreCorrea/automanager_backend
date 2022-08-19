require('dotenv').config()
const mongoose = require('mongoose')

const dbUser = process.env.DB_USER
const dbName = process.env.DB_NAME
const dbPass = process.env.DB_PASS
const dbCluster = process.env.DB_CLUSTER

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbCluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`).then(() => {
    console.log('Connected database')
}).catch((error) => {
    console.log(error)
})