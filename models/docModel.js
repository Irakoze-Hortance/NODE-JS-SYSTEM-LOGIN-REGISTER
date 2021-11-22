const mongoose=require("mongoose")
const Joi=require("joi")

const Doc=mongoose.model(
    "Doc",
    new mongoose.Schema({
        name:String,
        description:String,
        docFile:Array,
        authors:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ]
    }));
function validateDocument(Doc){
    const JoiSchema=Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required(),
        docFile:Joi.array().required(),
    }).options({abortEarly:false})
    return JoiSchema.validate(Doc);
}
module.exports.validateDocument=validateDocument;
module.exports=Doc;    