const model = require("../models")
const jwt = require('jsonwebtoken')
const Op = require('sequelize').Op

function validateEmail(mail) 
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
}

module.exports = {
    
    add : (req, res) => {
        // Validate request
        try {
            var bodyResponse = {
                first_name: false,                
                last_name: false,
                email: false,
                phone_number: false,                
                address: false,
                isDeleted: false
            }         
            
            //Validate Email
            if (req.body.email && validateEmail(req.body.email)) {
                bodyResponse.email = true
            } else {
                bodyResponse.email = false
            }

            //Validate first_name
            req.body.first_name ? bodyResponse.first_name = true : bodyResponse.first_name = false
            
            //Validate last_name
            req.body.last_name ? bodyResponse.last_name = true : bodyResponse.last_name = false

            //Validate phone_number
            req.body.phone_number ? bodyResponse.phone_number = true : bodyResponse.phone_number = false

            //Validate address
            req.body.address ? bodyResponse.address = true : bodyResponse.address = false
            
            //Validate Is Deleted
            req.body.isDeleted ? bodyResponse.isDeleted = true : bodyResponse.isDeleted = false

            if(bodyResponse.username && bodyResponse.phone_number){
                // Save customer in the database
                model.customer.create(req.body)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({message : err.message || "Some error occurred while creating customer."});
                });
            }else{
                res.send(bodyResponse)
            }
                                        
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
        
    },

    list : (req, res) => {
        try {
            model.customer.findAll({}).then(result => (
                result ? res.status(200).json(result) : res.status(404).send("Not Found")
            ))
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
    },

    show : (req, res) => {
        try {            
            let search = req.query.search ? req.query.search : 0
            let bodyWhere = {}
            if(search) {
                bodyWhere = {
                    where: {
                        [Op.or]: {
                            email: {[Op.substring] : `${search}`},
                            first_name: {[Op.substring] : `${search}`},
                            last_name: {[Op.substring] : `${search}`},
                            phone_number: {[Op.substring] : `${search}`},
                            address: {[Op.substring] : `${search}`},
                        },
                    }
                }
            }
            model.customer.findOne(bodyWhere).then(result => (                
                
                res.status(200).json(result)

            ))

        } catch (error) {
            res.status(error.code || 500).send(error)
        }        
    },

    update : (req, res) => {
        try {
            var bodyResponse = {
                email: false,
                username: false,
                password: false,
                isDeleted: false
            }         
            
            //Validate Email
            if (req.body.email && validateEmail(req.body.email)) {
                bodyResponse.email = true
            } else {
                bodyResponse.email = false
            }

            //Validate Username
            req.body.username ? bodyResponse.username = true : bodyResponse.username = false

            //Validate Password
            //Password shoud be more than 6 characters
            req.body.password ?
                req.body.password.length > 6 ? bodyResponse.password = true : bodyResponse.password = false 
                : bodyResponse.password = false

            //Validate Is Deleted
            req.body.isDeleted ? bodyResponse.isDeleted = true : bodyResponse.isDeleted = false

            if(bodyResponse.email || bodyResponse.username || bodyResponse.password || bodyResponse.isDeleted){
                // Update customer in the database
                model.customer.update(req.body, {where: {email: req.params.email}}).then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({message : err.message || "Some error occurred while updating customer."});
                });                
            }else{
                res.send(bodyResponse)
            }
                        
        } catch (error) {
            res.status(error.code || 500).send(error)
        }        
    }

    
}
