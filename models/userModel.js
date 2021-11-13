const mongoose=require('mongoose')
const Joi=require('joi')
Joi.objectId=require('joi-objectid')(Joi)



const User =mongoose.model("User",
new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    userRole:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"roles",
    },
})
);

const validateUser=(user)=>{
    const JoiSchema=Joi.object({
        fullName:Joi.string().min(3).max(40).required(),
        email:Joi.string().required(),
        password:Joi.string().required().min(4).max(20),
        userRole:Joi.objectId().required(),
    });
    return joiSchema.validate(user);
}
module.exports.User=User;
module.exports.validateUser=validateUser;