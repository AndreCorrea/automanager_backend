const Company = require('../models/Company')
const UsageRecord = require('../models/UsageRecord')

const RecordController = {
    async showAll(req, res) {
        const getToken = req.headers.authorization
        const token = getToken && getToken.split(' ')[1]
        const verifyCompany = await Company.findOne({ token })
        const verifyRecords = await UsageRecord.find({ company_id: verifyCompany._id }).
            populate('driver_id veicle_id')

        if (verifyRecords < 1) {
            return res.status(404).json({ error: { notice: "Não foi encontrado nenhum registro." } })
        }

        try {
            return res.status(200).json({ data: { verifyRecords } })
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
        const verifyRecord = await UsageRecord.findOne({ _id: id, company_id: verifyCompany._id }).
            populate('driver_id veicle_id')

        if (!verifyRecord) {
            return res.status(404).json({ error: { notice: "Registro não encontrado." } })
        }

        try {
            return res.status(200).json({ data: { verifyRecord } })
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
        const verifyRecord = await UsageRecord.findOne({ _id: id, using_status: true, company_id: verifyCompany._id })

        if (!verifyRecord) {
            return res.status(404).json({ error: { notice: "Registro não encontrado." } })
        }

        try {
            await UsageRecord.deleteOne({ _id: verifyRecord._id })
            return res.status(200).json({ success: { message: "Removido com sucesso." } })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: { notice: "Houve um problema no servidor. Tente novamente mais tarde." } })
        }
    },

    async finished(req, res) {
        const { id } = req.params
        const getToken = req.headers.authorization
        const token = getToken && getToken.split(' ')[1]
        const verifyCompany = await Company.findOne({ token })
        const verifyRecord = await UsageRecord.findOne({ _id: id, company_id: verifyCompany._id })

        if (!verifyRecord) {
            return res.status(404).json({ error: { notice: "Registro não encontrado." } })
        }

        const recordData = { _id: verifyRecord._id }
        const updateRecord = {
            finish_date: new Date(),
            using_status: false,
            updateAt: new Date()
        }

        try {
            await UsageRecord.findOneAndUpdate(recordData, updateRecord)
            return res.status(200).json({ success: { message: "Finalizado com sucesso." } })
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
        const verifyRecord = await UsageRecord.findOne({ _id: id, company_id: verifyCompany._id })

        if (!verifyRecord) {
            return res.status(404).json({ error: { notice: "Registro não encontrado." } })
        }

        const recordData = { _id: verifyRecord._id }
        const updateRecord = {
            ...data,
            updateAt: new Date()
        }

        try {
            await UsageRecord.findOneAndUpdate(recordData, updateRecord)
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

        const verifyDriverStatus = await UsageRecord.find({ driver_id: data.driver_id, using_status: true, company_id: verifyCompany._id })
        const verifyUsingVeicle = await UsageRecord.find({ veicle_id: data.veicle_id, using_status: true, company_id: verifyCompany._id })

        if (verifyDriverStatus.length > 0) {
            return res.status(400).json({ error: { notice: "Motorista não pode usar mais de 1 carro por vez. Por favor, finalize o último registro deste motorista." } })
        }

        if (verifyUsingVeicle.length > 0) {
            return res.status(400).json({ error: { notice: "Este veículo já está sendo usado por outro motorista. Finalize-o primeiro." } })
        }

        const recordData = new UsageRecord({
            ...data,
            start_date: new Date(),
            company_id: verifyCompany._id.toString(),
        })

        try {
            await recordData.save()
            return res.status(200).json({ success: { message: "Registro cadastrado com sucesso." } })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: { notice: "Houve um problema no servidor. Tente novamente mais tarde." } })
        }
    },
}

module.exports = RecordController