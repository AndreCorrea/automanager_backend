const authUser = require('../middlewares/authUser')
const CompanyController = require('../controllers/CompanyController')

module.exports = function (app) {

    // Company Route 
    app.post('/company/register', CompanyController.register)
    app.post('/company/login', CompanyController.login)

    // Veicles Route
}