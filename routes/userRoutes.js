const {authJwt}=require('../middlewares/')
const express = require('express')
const router=express.Router()
const userController=require('../controllers/userController')

module.exports=function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token,Origin,Content-Type,Accept"
        );
        next();
    })
    app.get("/api/test/all",userController.allAccess)
    app.get("/api/test/user",[authJwt.verifyToken],userController.userBoard);
    app.get("/api/test/mod",[authJwt.verifyToken,authJwt.isAdmin],userController.adminBoard);
}