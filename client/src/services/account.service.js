import constants from "../utils/constants.util"
import axios from "axios"

export const LoginService = async function (email, password) {

    try {
        return await axios.post(`${constants.apiUrl}/login`, {
            email,
            password
        });

    } catch (error) {

        return error.response;
    }
}

export const SignUpService = async function (email, password) {

    try {
        return await axios.post(`${constants.apiUrl}/sign_up`, {
            email,
            password
        });

    } catch (error) {

        return error.response;
    }
}