const model = require("../models")
const jwt = require('jsonwebtoken');



module.exports = {
    login : (req, res) => {
        // Validate request
        try {
            var bodyResponse = {
                username: false,                
                password: false                
            }         
            
            //Validate username
            if (req.body.username ) {
                bodyResponse.username = true
            } else {
                bodyResponse.username = false
            }

            //Validate Password            
            req.body.password ? bodyResponse.password = true : bodyResponse.password = false           

            if(bodyResponse.username && bodyResponse.password){                
                model.superadmin.findOne({where:{
                    username:req.body.username,
                    password:req.body.password,
                }})
                .then(async data => {
                    var token = await jwt.sign({username:data.username},"my-client-secret");
                    res.send({access_token:token,type:'Bearer '});
                })
                .catch(err => {
                    res.status(500).send({message : err.message || "Some error occurred while login SuperAdmin."});
                });
            }else{
                res.send(bodyResponse)
            }
                                        
        } catch (error) {
            res.status(error.code || 500).send(error)
        }
        
    }

    

    
}
