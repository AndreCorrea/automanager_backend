require('dotenv').config()
const jwt = require('jsonwebtoken')
const Company = require('../models/Company')

const authUser = async (req, res, next) => {
    const getToken = req.headers.authorization
    const token = getToken && getToken.split(' ')[1]
    const secretToken = process.env.SECRET_TOKEN
    const companyCheck = await Company.findOne({ token })

    if (!token) {
        return res.status(401).json({ error: { notice: "Não autorizado" } })
    }

    if (!companyCheck) {
        return res.status(401).json({ error: { notice: "Não autorizado" } })
    }

    try {
        jwt.verify(token, secretToken, function (err, decoded) {
            if (err && !decoded) {
                console.log(err)
                return res.status(400).json({ error: { notice: "Token inválido" } })
            }

            return next()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: { notice: "Erro no servidor. Tente novamente  mais tarde." } })
    }
}

module.exports = authUser