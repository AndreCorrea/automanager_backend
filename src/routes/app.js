const authCompany = require('../middlewares/authCompany')
const CompanyController = require('../controllers/CompanyController')
const VeicleController = require('../controllers/VeicleController')
const DriverController = require('../controllers/DriverController')
const RecordController = require('../controllers/RecordController')

module.exports = function (app) {

    // User company Route 
    app.post('/company/register', CompanyController.register)
    app.post('/company/login', CompanyController.login)

    // Veicles Route
    app.post('/veicle', authCompany, VeicleController.register)
    app.patch('/veicle/:id', authCompany, VeicleController.update)
    app.delete('/veicle/:id', authCompany, VeicleController.delete)
    app.get('/veicle/:id', authCompany, VeicleController.showOne)
    app.get('/veicles', authCompany, VeicleController.showAll)
    app.get('/veicles/:search', authCompany, VeicleController.filter)

    // Driver Route
    app.post('/driver', authCompany, DriverController.register)
    app.patch('/driver/:id', authCompany, DriverController.update)
    app.delete('/driver/:id', authCompany, DriverController.delete)
    app.get('/driver/:id', authCompany, DriverController.showOne)
    app.get('/drivers', authCompany, DriverController.showAll)
    app.get('/drivers/:search', authCompany, DriverController.filter)

    // Record Route
    app.post('/record', authCompany, RecordController.register)
    app.patch('/record/:id', authCompany, RecordController.update)
    app.patch('/record/finished/:id', authCompany, RecordController.finished)
    app.delete('/record/:id', authCompany, RecordController.delete)
    app.get('/record/:id', authCompany, RecordController.showOne)
    app.get('/records', authCompany, RecordController.showAll)
}