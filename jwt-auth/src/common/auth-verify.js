import  React,{Component}  from 'react'
import {withRouter} from 'react-router-dom'

const parseJwt=(token)=>{
    try{
        return JSON.parse(atob(token.split('.')[1]));
    }catch(e){
        return null;
    }
};