const Company = require('../models/Company')
const Veicle = require('../models/Veicle')

const VeicleController = {

    async filter(req, res) {
        const getToken = req.headers.authorization
        const token = getToken && getToken.split(' ')[1]
        const verifyCompany = await Company.findOne({ token })

        const query = {}
        query.company_id = verifyCompany._id

        if (req.query.brand) {
            query.brand = req.query.brand
        }

        if (req.query.color) {
            query.color = req.query.color
        }

        try {
            const filteredVeicles = await Veicle.find(query)
            return res.status(200).json({ data: { filteredVeicles } })
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
            const getVeicles = await Veicle.find({ company_id: verifyCompany._id })
            return res.status(200).json({ data: { getVeicles } })
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
        const veicleVerify = await Veicle.findOne({ _id: id })

        if (!veicleVerify) {
            return res.status(404).json({ error: { notice: "Veículo não encontrado." } })
        }

        if (verifyCompany._id.toString() !== veicleVerify.company_id.toString()) {
            return res.status(400).json({ error: { notice: "Não autorizado" } })
        }

        try {
            const getVeicle = await Veicle.findOne({ _id: veicleVerify._id })
            return res.status(200).json({ data: { getVeicle } })
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
        const veicleVerify = await Veicle.findOne({ _id: id })

        if (!veicleVerify) {
            return res.status(404).json({ error: { notice: "Veículo não encontrado." } })
        }

        if (verifyCompany._id.toString() !== veicleVerify.company_id.toString()) {
            return res.status(400).json({ error: { notice: "Não autorizado" } })
        }

        try {
            await Veicle.deleteOne({ _id: veicleVerify._id })
            return res.status(200).json({ success: { message: "Removido com sucesso." } })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: { notice: "Houve um problema no servidor. Tente novamente mais tarde." } })
        }
    },

    async update(req, res) {
        const { id } = req.params
        const { brand, model, color } = req.body
        const getToken = req.headers.authorization
        const token = getToken && getToken.split(' ')[1]

        const verifyCompany = await Company.findOne({ token })
        const veicleVerify = await Veicle.findOne({ _id: id })

        if (!veicleVerify) {
            return res.status(404).json({ error: { notice: "Veículo não encontrado." } })
        }

        if (verifyCompany._id.toString() !== veicleVerify.company_id.toString()) {
            return res.status(400).json({ error: { notice: "Não autorizado" } })
        }

        const filterVeicle = { _id: veicleVerify._id };
        const updateVeicle = {
            brand,
            model,
            color,
            updateAt: new Date()
        }

        try {
            await Veicle.findOneAndUpdate(filterVeicle, updateVeicle)
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

        const verifyLicense = await Veicle.findOne({ license_plate: data.license_plate })

        if (verifyLicense) {
            return res.status(400).json({ error: { notice: "Place já cadastrada no sistema." } })
        }

        const veicleData = new Veicle({
            ...data,
            company_id: verifyCompany._id.toString()
        })

        try {
            await veicleData.save()
            return res.status(200).json({ success: { message: "Veículo cadastrado com sucesso." } })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: { notice: "Houve um problema no servidor. Tente novamente mais tarde." } })
        }
    },
}

module.exports = VeicleController