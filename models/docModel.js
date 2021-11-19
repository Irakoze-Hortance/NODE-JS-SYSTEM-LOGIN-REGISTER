const mongoose=require("mongoose")

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
module.exports=Doc;    