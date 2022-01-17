const db=require('../models')
const User=db.user;
const ROLES=db.ROLES

checkDuplicateEmailOrUsername=(req,res,next) => {
    User.findOne({ 
        username: req.body.username,
    }).exec((err, user) => {
        if(err) return res.status(500).send({ message:err.message});

        if(user){
            return res.status(200).send({ message:"Failed! Email already in use "})
        }
        User.findOne({
            email:req.body.email,
        }).exec((err,user)=>{
            if(err){
                res.status(500).send({ message:err});
                return;
            }
            if(user){
                res.status(400).send({message:"Email already in use!"})
                return;
            }
            next();
        });
        
    });
};

checkRolesExisted=(req,res,next) => {
    if(req.body.roles){
        for(let i=0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(404).send({
                    message:`Failed Role ${req.body.roles[i]} does not exist`
                });
                return;
            }
        }
    }
    next();
    
}

const verifySignUp={
    checkDuplicateEmailOrUsername,
    checkRolesExisted,
}
module.exports=verifySignUp