import AsyncStorage from '@react-native-community/async-storage';

export const Store = async function(key, object){

    await AsyncStorage.setItem(key,JSON.stringify(object));
}

export const Fetch = async function(key){

    var object = await AsyncStorage.getItem(key);
    if(object!==null)
        return JSON.parse(object);
}

export const Delete = async function(key){

    await AsyncStorage.removeItem(key);
}