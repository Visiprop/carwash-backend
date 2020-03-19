const routers = require('express').Router()
const models = require('../models')
const controllers = require('../controllers/controller-index')

routers.get("/:email", controllers.admin.show)

module.exports = routers;