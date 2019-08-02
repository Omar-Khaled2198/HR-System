import {AsyncStorage} from 'react-native';

export const StoreAccount = async function(email,password,token){

    var account = {
        "email": email,
        "password": password,
        "token": token
    }
    await AsyncStorage.setItem('account',JSON.stringify(account));
}

export const FetchAccount = async function(){

    var account = await AsyncStorage.getItem('account');
    if(account!==null)
        return JSON.parse(account);
}

export const DeleteAccount = async function(){

    await AsyncStorage.removeItem("account");
}