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
