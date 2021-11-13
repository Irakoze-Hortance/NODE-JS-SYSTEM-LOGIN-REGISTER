const jwt=require('jsonwebtoken')
const config=require('../config/authConfig')
const db=require('../models')
const {User}=db.User;
const Role=db.role;

const verifyToken=(req,res,next) => {
    let token=req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(403).send({message:"No token provided"})
    }
    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({message:err.message});
            I;
        }
        res.userId=decoded.id;
        next();
    });
};

const isAdmin=async(req,res,next)=>{
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            return res.status(500).send({message:err});
            return;
        }
        Role.findOne(
            {
                _id:user.userRole,
            },
            (err,roles)=>{
                if(err){
                    res.status(500).send({message:err.message});
                    return;
                }
                if(roles._doc.name.toLowerCase()=="admin"){
                    next();
                    return;
                }
                res.status(403).send({message:"Requires admin role"})
                return;
            }
        )
    })

}

const isUser=(req,res,next) => {
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err.message});
            return;
        }

        Role.find({
            _id:user.role,
        },
        (err,role)=>{
            if(err){
                res.status(500).send({message:err.message});
                return;
            }
            if(role._doc.name.toLowerCase()==="user"){
                next();
                return;
            }
            res.status(403).send({message:"Requires user role"});
            return;
        }
        )
    })
}

const authJwt={
    verifyToken,
    isAdmin,
    isUser,
};
module.exports=authJwt;