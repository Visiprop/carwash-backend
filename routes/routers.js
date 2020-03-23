const routers = require('express').Router()
const models = require('../models')
const controllers = require('../controllers/controller-index')
const auth = require('../middleware/auth')

routers.post("/superadmin/login", controllers.superadmin.login)
routers.post("/admin/login", controllers.admin.login)

routers.get("/admin/show/:email", auth.isAuthorized, auth.isSuperadmin, controllers.admin.show)
routers.get("/admin/list", auth.isAuthorized, auth.isSuperadmin, controllers.admin.list)
routers.post("/admin/add", auth.isAuthorized, auth.isSuperadmin, controllers.admin.add)
routers.put("/admin/update/:email", auth.isAuthorized, auth.isSuperadmin, controllers.admin.update)

routers.get("/customer/show", auth.isAuthorized, auth.isSuperadmin, controllers.customer.show)

module.exports = routers;