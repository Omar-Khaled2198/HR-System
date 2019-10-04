import AsyncStorage from "@react-native-community/async-storage";


const StorageManager = {

    Store: async function(key, object) {
		await AsyncStorage.setItem(key, JSON.stringify(object));
	},
	
	Fetch: async function(key) {
		const object = await AsyncStorage.getItem(key);
		if (object !== null) return JSON.parse(object);
	},
	
	Delete: async function(key) {
			await AsyncStorage.removeItem(key);
	}
}

export default StorageManager;

