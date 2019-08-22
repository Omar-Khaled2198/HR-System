import constants from "../utils/constants.util"
import axios from "axios"

export const GetTasksService = async function () {

    try {
        return await axios.get(`${constants.apiUrl}/employee/${global.profile_id}/tasks`, {
            headers: {
                'x-access-token': global.token
            }
        });

    } catch (error) {
        return error.response;
    }
}

export const ChangeTaskStatusService = async function(task_id,status){
    
    try {
        return await axios.put(`${constants.apiUrl}/employee/${global.profile_id}/tasks/${task_id}`,{
            status
        },{
            headers: {
                'x-access-token': global.token
            }
        });

    } catch (error) {
        return error.response;
    }
}