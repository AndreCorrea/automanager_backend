const Company = require('../models/Company')
const Driver = require('../models/Driver')

const DriverController = {

    async filter(req, res) {
        const getToken = req.headers.authorization
        const token = getToken && getToken.split(' ')[1]
        const verifyCompany = await Company.findOne({ token })

        const query = {}
        query.company_id = verifyCompany._id

        if (req.query.name) {
            query.name = { "$regex": `${req.query.name}`, "$options": "i" }
        }

        if (req.query.cpf) {
            query.cpf = req.query.cpf
        }

        try {
            const filteredDrivers = await Driver.find(query)
            return res.status(200).json({ data: { filteredDrivers } })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: { notice: "Houve um problema no servidor. Tente novamente mais tarde." } })
        }
    },

    async showAll(req, res) {
        const getToken = req.headers.authorization
        const token = getToken && getToken.split(' ')[1]

        const verifyCompany = await Company.findOne({ token })

        try {
            const getDrivers = await Driver.find({ company_id: verifyCompany._id })
            return res.status(200).json({ data: { getDrivers } })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: { notice: "Houve um problema no servidor. Tente novamente mais tarde." } })
        }
    },

    async showOne(req, res) {
        const { id } = req.params
        const getToken = req.headers.authorization
        const token = getToken && getToken.split(' ')[1]

        const verifyCompany = await Company.findOne({ token })
        const driverVerify = await Driver.findOne({ _id: id, company_id: verifyCompany._id })

        if (!driverVerify) {
            return res.status(404).json({ error: { notice: "Motorista não encontrado." } })
        }

        try {
            const getDriver = await Driver.findOne({ _id: driverVerify._id }).populate('company_id')
            return res.status(200).json({ data: { getDriver } })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: { notice: "Houve um problema no servidor. Tente novamente mais tarde." } })
        }
    },

    async delete(req, res) {
        const { id } = req.params
        const getToken = req.headers.authorization
        const token = getToken && getToken.split(' ')[1]

        const verifyCompany = await Company.findOne({ token })
        const driverVerify = await Driver.findOne({ _id: id, company_id: verifyCompany._id })

        if (!driverVerify) {
            return res.status(404).json({ error: { notice: "Motorista não encontrado." } })
        }

        try {
            await Driver.deleteOne({ _id: driverVerify._id })
            return res.status(200).json({ success: { message: "Removido com sucesso." } })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: { notice: "Houve um problema no servidor. Tente novamente mais tarde." } })
        }
    },

    async update(req, res) {
        const { id } = req.params
        const { ...data } = req.body
        const getToken = req.headers.authorization
        const token = getToken && getToken.split(' ')[1]

        const verifyCompany = await Company.findOne({ token })
        const driverVerify = await Driver.findOne({ _id: id, company_id: verifyCompany._id })

        if (!driverVerify) {
            return res.status(404).json({ error: { notice: "Veículo não encontrado." } })
        }

        const driverData = { _id: driverVerify._id };
        const updateDriver = {
            ...data,
            updateAt: new Date()
        }

        try {
            await Driver.findOneAndUpdate(driverData, updateDriver)
            return res.status(200).json({ success: { message: "Atualizado com sucesso." } })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: { notice: "Houve um problema no servidor. Tente novamente mais tarde." } })
        }
    },

    async register(req, res) {
        const { ...data } = req.body
        const getToken = req.headers.authorization
        const token = getToken && getToken.split(' ')[1]
        const verifyCompany = await Company.findOne({ token })

        const verifyDriver = await Driver.find({ cpf: data.cpf, company_id: verifyCompany._id })

        if (verifyDriver.length > 0) {
            return res.status(400).json({ error: { notice: "Já existe um motorista com esse CPF em seu painel." } })
        }

        const driverData = new Driver({
            ...data,
            company_id: verifyCompany._id.toString()
        })

        try {
            await driverData.save()
            return res.status(200).json({ success: { message: "Motorista cadastrado com sucesso." } })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: { notice: "Houve um problema no servidor. Tente novamente mais tarde." } })
        }
    },
}

module.exports = DriverController