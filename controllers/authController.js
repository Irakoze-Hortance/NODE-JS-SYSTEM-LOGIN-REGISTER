const config=require('../config/authConfig')
const db=require('../models')
const User=db.user;
const Role=db.role;

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup=(req,res)=>{

    const user=new User({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8),
    });
     user.save((err,user)=>{
         if(err){
             res.status(500).send({message:err})
         }
     })
    
    if(req.body.roles){
        Role.find({
            name:{$in:req.body.roles}
        },(err,roles) =>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            user.roles=roles.map(role=>role._id);
            user.save(err=>{
                if(err){
                    res.status(500).send({message:err});
                    return;
                }
                res.send({message:"User registered successfully"});
            })
        }
        )
    }else{

        Role.findOne({name:"user"},(err,role)=>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            user.roles=[role._id];
            user.save(err=>{
                if(err){
                    res.status(500).send({message:err});
                    return;
                }
                res.send({message:"User registered successfully"});
            })
        })
    }
    
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
