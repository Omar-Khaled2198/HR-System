import constants from "../utils/constants.util"
import axios from "axios"
import ImagePicker from 'react-native-image-picker';

export const GetProfileService = async function () {

    try {
        return await axios.get(`${constants.apiUrl}/employee/profile`, {
            headers: {
                'x-access-token': global.token
            }
        });

    } catch (error) {
        return error.response;
    }
}

export const CreateProfileService = async function (first_name, last_name, job_title, profile_picture) {

    try {
        return await axios.post(`${constants.apiUrl}/employee/profile`, {
            first_name,
            last_name,
            job_title,
            profile_picture
        }, {
            headers: {
                'x-access-token': global.token
            }
        });

    } catch (error) {

        return error.response;
    }

}

export const UploadProfilePictureService = async function () {

    var options = {
        title: 'Select Image',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    ImagePicker.showImagePicker(options, async (response) => {

        //console.log('User selected a file form camera or gallery', response); 
        const data = new FormData();
        data.append('profile_picture', {
            uri: response.uri,
            type: 'image/jpeg',
            name: response.fileName
        });
        try {
            return await axios.post(`${constants.apiUrl}/employee/profile_picture`, data, {
                headers: {
                    'x-access-token': global.token,
                    'content-type': 'multipart/form-data'
                }
            });

        } catch (error) {

            return error.response;
        }

    })

}