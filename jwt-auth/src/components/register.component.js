import React ,{Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import AuthService from "../services/auth.service";

const required=value=>{
    if(!value){
        return(
            <div classNAme="alert alert-danger">
                This  is a required field
            </div>
        );
    }
};

