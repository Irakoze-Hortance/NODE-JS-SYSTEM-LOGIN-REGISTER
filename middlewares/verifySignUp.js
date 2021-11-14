const db=require('../models')
const {User}=db.User
const Role=db.role
const mongoose=require('mongoose')

const checkDuplicateEmail=(req,res,next) => {
    User.findOne({ 
        email: req.body.email,
    }).exec((err, user) => {
        if(err) return res.status(500).send({ message:err.message});

        if(user){
            return res.status(200).send({ message:"Failed! Email already in use "})
        }
        next();
    })
}

checkRolesExisted=async(req,res,next) => {
    const isValid=await mongoose.Types._ObjectId.isValid(req.body.userRole);
    if(!isValid) return res.send({ message:"Id must be a valid mongoose object id"})

    if(req.body.userRole){
        await Role.findById(req.body.userRole)
        .then((role)=>{
            if(!role){
                return res.status(404).send({ message:`Failed! Role ${req.body.userRole} does not exit`})
            }else{
                next();
            }

        })
        .catch((err)=>{
            return res.status(400).send({ message:err.message})
        })
    }
}

const verifySignUp={
    checkDuplicateEmail,
    checkRolesExisted,
}
module.exports=verifySignUp