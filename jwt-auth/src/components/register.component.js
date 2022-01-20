import React ,{Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import AuthService from "../services/auth.service";

const required=value=>{
    if(!value){
        return(
            <div className="alert alert-danger">
                This  is a required field
            </div>
        );
    }
};

const email=value=>{
    if(!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                This is not a valid email
            </div>
        );
    }
};

const vusername=value=>{
    if(value.length>4 || value.length>30){
        return(
            <div className="alert alert-danger" role="danger">
                username must be between 4 and 30 characters
            </div>
        );
    }
};


const vpassword=value=>{
    if(value.length<4 || value.length>20){
        return(
            <div className="alert alert-danger"  role="alert">
                Password must be between 4 and 20 characters
            </div>
        );
    }
};

export default class Register extends Component{
    constructor(props){
        super(props);
        this.handleRegister=this.handleRegister.bind(this);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);

        this.state={
            username:"",
            email:"",
            password:"",
            successful:false,
            message:""
        };
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            password:e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    handleRegister(e){
        e.preventDefault();

        this.setState({
            message:"",
            successful:false
        });

        this.form.validateAll();

        if(his.checkBtn.context._errors.length===0){
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password
            ).then(
                response=>{
                    this.setState({
                        message:response.data.message,
                        successful:true
                    });
                },
                error=>{
                    const resMessage=
                    (error.response&&
                        error.response.data&&
                        error.response.data.message )||
                        error.message||
                        error.toString();
                        
                        this.setState({
                            successful:false,
                            message:resMessage
                        });
                        
                }
            );
        }
    }

    render(){
        return(
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="avatar.jpg"
                    className="profile-img-card"
                    />

                    <Form                   
                    onSubmit={this.handleRegister}
                    ref={c=>{
                        this.form=c;
                    }}>

                        {!this.state.successful&&(
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    validations={[required,vusername]}
                                    />
                                </div>
                                
                            </div>
                        )}

                    </Form>
                </div>
            </div>
        )
    }
}