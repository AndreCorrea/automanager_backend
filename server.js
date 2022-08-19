const express = require('express')
const app = express()

app.use(express.json())

const portHost = 5000

require('./src/config/database')
require('./src/routes/app')(app)

app.listen(portHost, () => {
    console.log('Server is running on port 5000')
})