const {authJwt}=require('../middlewares/')
const express = require('express')
const router=express.Router()
const userController=require('../controllers/userController')

router.get("/all",userController.allAccess)
router.get("/user",[authJwt.verifyToken,authJwt.isAdmin],userController.userBoard)
router.get("/admin",[authJwt.verifyToken,authJwt.isAdmin],userController.adminBoard)

module.exports=router