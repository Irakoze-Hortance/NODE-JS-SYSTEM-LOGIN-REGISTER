const {verifySignUp}=require("../middlewares");
const controller=require('../controllers/authController')

module.exports=function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-acess-token,Origin,Content-Type,Accept"
        );
        next();
    })

    app.post('/api/auth/signup',[verifySignUp.checkDuplicateEmailOrUsername,verifySignUp.checkRolesExisted],controller.signup);
    app.post('/api/auth/signin',controller.signin)
}
