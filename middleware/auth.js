const jwt = require('jsonwebtoken');
const model = require("../models")

module.exports = {
  isSuperadmin: (req,res,next) => {
    try {
      if(req.headers.authorization) {
        if(req.token){
            model.superadmin.findOne({where:{
                username:req.token.username,            
            }})
            .then(async data => {            
                if(data){
                    next()
                }else{
                    res.send('You Are Not Superadmin!')
                }
            })
            .catch(err => {
                res.status(500).send({message : err.message || "Some error occurred while login SuperAdmin."});
            }); 
        } else {
            res.status(500).send({message : err.message || "Some error occurred, Token is Invalid"});  
        }
      } else {
        res.status(404).json({
          message: 'Header is Invalid'
        });
      }
    } catch(err) {
      res.status(401).json({
        message: 'Header is Invalid'
      });
    }
  },
  isAuthorized: (req,res,next) => {
      try {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split('Bearer ')[1];
            var decoded = jwt.verify(token, "my-client-secret");
            if(decoded){
                req.token = decoded
                next()
            }else{
                res.status(500).send({message : "Invalid Header!"});
            }
          } else {
            res.status(404).json({
              message: 'Header is Invalid'
            });
          }  
      } catch (error) {
        res.status(500).send({message : "Some error occurred, Invalid Header!"});   
      }
    
  },
};
