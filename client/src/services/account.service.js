import constants from "../utils/constants.util"
import axios from "axios"

export default AccountService = {
    
    SignIn : async function (email, password) {

        try {
            return await axios.post(`${constants.apiUrl}/sign_in`, {
                email,
                password
            });
    
        } catch (error) {
    
            return error.response;
        }
    },
    
    SignUp : async function (email, password) {
    
        try {
            return await axios.post(`${constants.apiUrl}/sign_up`, {
                email,
                password
            });
    
        } catch (error) {
    
            return error.response;
        }
    }
}