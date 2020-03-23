const admin = require("./admin.controller")
const superadmin = require("./superadmin.controller")
const customer = require("./customer.controller")


module.exports = {
    admin: admin,
    superadmin: superadmin,
    customer: customer
}