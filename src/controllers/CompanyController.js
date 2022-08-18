require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Company = require('../models/Company')

const CompanyController = {

    async login(req, res) {
        const { cnpj, password } = req.body

        const cnpjExist = await Company.findOne({ cnpj })

        if (!cnpjExist) {
            return res.status(404).json({ error: { message: "CNPJ ou senha estão incorretos." } })
        }

        const comparePassword = await bcrypt.compare(password, cnpjExist.password)

        if (!comparePassword) {
            return res.status(404).json({ error: { message: "CNPJ ou senha estão incorretos." } })
        }

        const companyData = {
            infos: {
                fantasy_name: cnpjExist.fantasy_name,
                corporate_name: cnpjExist.corporate_name,
            },

            auth: {
                token: cnpjExist.token,
            }
        }

        try {
            res.status(200).json({ companyData })
        } catch (errorr) {
            res.status(500).json({ error: "Houve um problema no servidor. Tente novamente mais tarde." })
            console.log(errorr)
        }
    },

    async register(req, res) {
        const { fantasy_name, corporate_name, email, cnpj, password } = req.body

        const mailExist = await Company.findOne({ email })
        const cnpjExist = await Company.findOne({ cnpj })

        if (mailExist) {
            return res.status(400).json({ error: { mesage: "Este email já existe" } })
        }

        if (cnpjExist) {
            return res.status(400).json({ error: { mesage: "Este CNPJ já existe" } })
        }

        const saltRoundsHash = 12
        const senhaHash = await bcrypt.hash(password, saltRoundsHash)

        const companyData = new Company({
            fantasy_name,
            corporate_name,
            email,
            cnpj,
            password: senhaHash
        })

        const secretToken = process.env.SECRET_TOKEN
        const token = jwt.sign({ data: companyData._id }, secretToken)
        companyData.token = token

        try {
            await companyData.save()
            res.status(200).json({ companyData })

        } catch (errorr) {
            res.status(500).json({ error: "Houve um problema no servidor. Tente novamente mais tarde." })
        }
    },
}

module.exports = CompanyController