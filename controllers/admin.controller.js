const model = require("../models")

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
                email: false,
                username: false,
                pwd: false
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
            req.body.pwd ?
                req.body.pwd.lenght > 6 ? bodyResponse.pwd = true : bodyResponse.pwd = false 
                : bodyResponse.pwd = false

            if(bodyResponse.email && bodyResponse.username && bodyResponse.pwd){
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
            model.admin.findAll({}).then(result => (
                result ? res.status(200).json(result) : res.status(404).send("Not Found")
            ))
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
    },

    show : (req, res) => {
        try {
            if(req.params.email && validateEmail(req.params.email)){
                model.admin.findOne({where: {email:req.params.email}}).then(result => (                
                    res.status(200).json(result)
                ))
            }else{            
                res.status(400).send("")
            }    
        } catch (error) {
            res.status(error.code || 500).send(error)
        }        
    }
}
