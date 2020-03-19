const model = require("../models")

module.exports = {
    list : (req, res) => {
        model.admin.findAll({}).then(result => (
            res.status(200).json(result)
        ))
    },

    show : (req, res) => {
        model.admin.findOne({where: {email:req.params.email}}).then(result => (
            res.status(200).json(result)
        ))
    }
}
