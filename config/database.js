var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:node-mongodb',{useNewUrlParser:true});
var conn=mongoose.connection;
conn.on("connected",function(){
    console.log("Database connected successfully")
})
conn.on('disconnected',function(){
    console.log("Database disconnected")
})
conn.on('Error',console.error.bind(console, "Connection error"));
