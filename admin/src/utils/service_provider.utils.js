import axios from "axios";

if(localStorage.getItem("account")){
	const account = JSON.parse(localStorage.getItem("account"));
    console.log("TCL: localStorage");
	axios.defaults.headers.common['authorization'] = account.token;
}

const ServiceProvider = {

	GET: async function(url, headers) {
		try {
			return await axios.get(url);
		} catch (error) {
			return error.response;
		}
	},

	POST: async function(url, object, headers ) {
		
		try {
			return await axios.post(url, object);
		} catch (error) {
			return error.response;
		}
	},

	PUT: async function(url, object, headers) {
		try {
			return await axios.put(url, object);
		} catch (error) {
			return error.response;
		}
	},

	Delete: async function(url, headers) {}
};

export default ServiceProvider;
