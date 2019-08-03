import constants from "../utils/constants.util"
import axios from "axios"


export const RequestVacationService = async function(title,description,from,to){

    try {
        
        return await axios.post(`${constants.apiUrl}/employee/${global.profile_id}/vacations`, {
            title,
            description,
            from,
            to,
        },{
            headers: {
                'x-access-token': global.token
            }
        });

    } catch (error) {
        return error.response;
    }

}

export const GetVacations = async function () {

    try {
        return await axios.get(`${constants.apiUrl}/employee/${global.profile_id}/vacations`, {
            headers: {
                'x-access-token': global.token
            }
        });

    } catch (error) {
        return error.response;
    }
}