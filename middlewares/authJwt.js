const jwt=require('jsonwebtoken')
const config=require('../config/authConfig')
const db=require('../models/')
const {User}=db.user;
const Role=db.role;

const verifyToken=(req,res,next) => {
    let token=req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({message:"No token provided"})
    }
    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({message:"Unauthorized"});
        }
        res.userId=decoded.id;
        next();
    });
};

const isAdmin=(req,res,next)=>{
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        Role.findOne(
            {
                _id:{$in:user.roles}
            },
            (err,roles)=>{
                if(err){
                    res.status(500).send({message:err.message});
                    return;
                }
                for(let i=0;i<roles.length;i++){
                    if(roles[i].name.toLowerCase()=="admin"){
                        next();
                        return;
                    }
                }

                res.status(403).send({message:"Requires admin role"})
                return;
            }
        )
    })

}

const isModerator=(req,res,next) => {
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err.message});
            return;
        }

        Role.find({
            _id:{$in:user.roles}
        },
        (err,roles)=>{
            if(err){
                res.status(500).send({message:err.message});
                return;
            }
            for(let i=0; i<roles.length;i++){
                if(role[i].name.toLowerCase()==="moderator"){
                    next();
                    return;
                }
            }
            
            res.status(403).send({message:"Requires moderator role"});
            return;
        }
        )
    })
}

const authJwt={
    verifyToken,
    isAdmin,
    isModerator
};
module.exports=authJwt;