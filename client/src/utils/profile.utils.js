import {AsyncStorage} from 'react-native';

export const StoreProfile = async function(profile){


    await AsyncStorage.setItem('profile',JSON.stringify(profile));
}

export const FetchProfile = async function(){

    var account = await AsyncStorage.getItem('profile');
    if(account!==null)
        return JSON.parse(account);
}

export const DeleteProfile = async function(){

    await AsyncStorage.removeItem("profile");
}