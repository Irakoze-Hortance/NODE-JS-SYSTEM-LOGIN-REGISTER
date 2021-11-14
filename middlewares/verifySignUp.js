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