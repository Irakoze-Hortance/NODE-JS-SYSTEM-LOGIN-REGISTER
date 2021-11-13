const config=require('../config/authConfig')
const db=require('../models')
const {User,validateUser}=db.user;
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup=async(req,res)=>{
    const {error}=validateUser(req.body);
    if(error) return res.status(400).send(error);

    const user=new User({
        fullName:req.body.fullName,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8),
        userRole:req.body.userRole,
    });
    await user
    .save()
    .then(() => {
        return res.status(201).send({message:"User registered  successfully"});
    })
    .catch((err) => {
        return res.status(500).send({message:err})
    })
    
};

exports.signin=(req, res) => {
    User.findOne({
        email:req.body.email,
    })
    .populate("role","__v")
    .exec((err,user) => {
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(!user){
            return res.status(404).send({message:"user not found"});
        }
        var passwordIsValid=bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).send({message:"Invalid password",accessToken:null});
        }
        var token=jwt.sign({id:userid},config.secret,{
            expiresIn:86400,
        });

        res.status(200).send({
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            role:req.body.role,
            acessToken:token,
        });
    });
}
