import axios from 'axios';

const API_URL="Http://localhost:8080/api/auth/";

class  AuthService{
    login(username,password){
        return axios
            .post(API_URL,+"signin",{
                username,
                passww
            })
    }
}