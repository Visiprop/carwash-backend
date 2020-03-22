const routers = require('express').Router()
const models = require('../models')
const controllers = require('../controllers/controller-index')

routers.get("/admin/show/:email", controllers.admin.show)
routers.post("/admin/add", controllers.admin.show)

module.exports = routers;