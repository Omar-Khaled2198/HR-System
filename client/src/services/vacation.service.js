import constants from "../utils/constants.util"
import axios from "axios"

export default VacationService = {

    RequestVacation : async function (title, description, from, to) {

        try {
    
            return await axios.post(`${constants.apiUrl}/employee/vacations`, {
                title,
                description,
                from,
                to,
            }, {
                headers: {
                    'x-access-token': global.account.token
                }
            });
    
        } catch (error) {
            return error.response;
        }
    
    },

    GetVacations : async function () {

        try {
            return await axios.get(`${constants.apiUrl}/employee/vacations`, {
                headers: {
                    'x-access-token': global.account.token
                }
            });
    
        } catch (error) {
            return error.response;
        }
    },

    AbortVacation : async function (vacation_id) {

        try {
            return await axios.put(`${constants.apiUrl}/employee/vacations/${vacation_id}`, {}, {
                headers: {
                    'x-access-token': global.account.token
                }
            });
    
        } catch (error) {
            return error.response;
        }
    }
}