import React,{Component} from "react";
import userService from "../services/user.service";

export default class Home extends Component{
    constructor(props){
        super(props);

        this.state={
            content:""
        };
    }

    componentDidMount(){
        userService.getPublicContent().then(
            response=>{
                this.setState({
                    content:response.data
                })
            }
        )
    }
}