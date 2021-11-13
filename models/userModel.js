const db=require('../config/database')
const mongoose=require('mongoose')
var userSchema=new mongoose.Schema({
    name:String,
    password:String,
    email:String,
});

var userModel=mongoose.model('users',userSchema);
module.exports=mongoose.model("Users",userModel);