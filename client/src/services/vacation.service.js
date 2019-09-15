import constants from "../utils/constants.util"
import axios from "axios"


export const RequestVacationService = async function (title, description, from, to) {

    try {

        return await axios.post(`${constants.apiUrl}/employee/${global.profile_id}/vacations`, {
            title,
            description,
            from,
            to,
        }, {
            headers: {
                'x-access-token': global.token
            }
        });

    } catch (error) {
        return error.response;
    }

};

export const GetVacationsService = async function () {

    try {
        return await axios.get(`${constants.apiUrl}/employee/${global.profile_id}/vacations`, {
            headers: {
                'x-access-token': global.token
            }
        });

    } catch (error) {
        return error.response;
    }
};

export const AbortVacationService = async function (vacation_id) {

    try {
        return await axios.put(`${constants.apiUrl}/employee/${global.profile_id}/vacations/${vacation_id}`, {}, {
            headers: {
                'x-access-token': global.token
            }
        });

    } catch (error) {
        return error.response;
    }
};