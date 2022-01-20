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
}