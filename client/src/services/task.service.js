import constants from "../utils/constants.util"
import axios from "axios"

export default TaskService = {

    GetTasks : async function () {

        try {
            return await axios.get(`${constants.apiUrl}/employee/tasks`, {
                headers: {
                    'x-access-token': global.account.token
                }
            });
    
        } catch (error) {
            return error.response;
        }
    },

    ChangeTaskStatus : async function (task_id) {

        try {
            return await axios.put(`${constants.apiUrl}/employee/tasks/${task_id}`, {}, {
                headers: {
                    'x-access-token': global.account.token
                }
            });
    
        } catch (error) {
            return error.response;
        }
    }

}
