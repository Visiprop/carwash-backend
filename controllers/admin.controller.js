const model = require("../models")
const jwt = require('jsonwebtoken');
const Op = require('sequelize').Op

function validateEmail(mail) 
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
}

module.exports = {
    login : (req, res) => {
        // Validate request
        try {
            var bodyResponse = {
                email: false,                
                password: false                
            }   
            
            //Validate email
            if (req.body.email ) {
                bodyResponse.email = true
            } else {
                bodyResponse.email = false
            }                    

            //Validate Password            
            req.body.password ? bodyResponse.password = true : bodyResponse.password = false           

            if(bodyResponse.email && bodyResponse.password){                
                model.admin.findOne({where:{
                    email:req.body.email,
                    password:req.body.password,
                }})
                .then(async data => {
                    var token = await jwt.sign({username:data.email},"my-client-secret");
                    res.send({access_token:token,type:'Bearer '});
                })
                .catch(err => {
                    res.status(500).send({message : err.message || "Some error occurred while login Admin."});
                });
            }else{
                res.send(bodyResponse)
            }
                                        
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
        
    },

    add : (req, res) => {
        // Validate request
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

            if(bodyResponse.email && bodyResponse.username && bodyResponse.password){
                // Save Admin in the database
                model.admin.create(req.body)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({message : err.message || "Some error occurred while creating Admin."});
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
            let page = req.query.page ? req.query.page : 1
            let limit = req.query.limit ? req.query.limit : 10
            let search = req.query.search ? req.query.search : ''
            let offset = parseInt(page) != 1 ? (parseInt(page)-1)*parseInt(limit) : 0
            try {
                model.admin.findAndCountAll({
                    where: {
                        [Op.or]: {
                            email: {
                                [Op.substring] : `${search}`
                            },
                        },
                        [Op.or]: {
                            username: {
                                [Op.substring] : `${search}`
                            },
                        },
                    },
                    offset: parseInt(offset),
                    limit: parseInt(limit),
                })
                .then(result => {
                        res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(err.code || 404).json({
                        message: err.message,
                    });
                });
            } catch (error) {
                res.status(error.code || 500).json({
                    message: error.message,
                });
            }
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
    },

    show : (req, res) => {
        try {
            if(req.params.email && validateEmail(req.params.email)){
                model.admin.findOne({where: {email:req.params.email,isDeleted:0}}).then(result => (                
                    res.status(200).json(result)
                ))
            }else{            
                res.status(400).send("")
            }    
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
                // Update Admin in the database
                model.admin.update(req.body, {where: {email: req.params.email}}).then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({message : err.message || "Some error occurred while updating Admin."});
                });                
            }else{
                res.send(bodyResponse)
            }
                        
        } catch (error) {
            res.status(error.code || 500).send(error)
        }        
    }

    
}
