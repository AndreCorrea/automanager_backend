require('dotenv').config()
const jwt = require('jsonwebtoken')

const authUser = (req, res, next) => {
    const getToken = req.headers.authorization
    const token = getToken && getToken.split(' ')[1]
    const secretToken = process.env.SECRET_TOKEN

    if (!token) {
        return res.status(401).json({ erro: { mensagem: "Não autorizado" } })
    }

    try {
        jwt.verify(token, secretToken, function (err, decoded) {
            if (err && !decoded) {
                console.log(err)
                return res.status(400).json({ erro: { mensagem: "Token inválido" } })
            }

            return next()
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ erro: { mensagem: "Erro no servidor. Tente novamente  mais tarde." } })
    }
}

module.exports = authUser