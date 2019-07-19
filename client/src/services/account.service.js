import constants from "../utils/constants.util"
import axios from "axios"

export const LoginService = async function(email,password){
    
    try {
        const response = await axios.post(`${constants.apiUrl}/login`, {
            email: email,
            password: password
          });

        return response;

      } catch (error) {

        return error.response;
      }
}

export const SignUpService = async function(email,password){
    
    try {
        const response = await axios.post(`${constants.apiUrl}/sign_up`, {
            email: email,
            password: password
          });
          
        return response;

      } catch (error) {

        return error.response;
      }
}