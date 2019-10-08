import axios from "axios";

axios.interceptors.request.use(
	config => {
		if(localStorage.getItem("account")){
			const account = JSON.parse(localStorage.getItem("account"));
			console.log("TCL: localStorage");
			config.headers["authorization"] = account.token;
		}
		return config;
	},

	error => {
		return Promise.reject(error);
	}
);

const ServiceProvider = {

	GET: async function(url, headers) {
		try {
			return await axios.get(url,{
				headers
			});
		} catch (error) {
			return error.response;
		}
	},

	POST: async function(url, object, headers ) {
		
		try {
			return await axios.post(url, object,{
				headers
			});
		} catch (error) {
			return error.response;
		}
	},

	PUT: async function(url, object, headers) {
		try {
			return await axios.put(url, object,{
				headers
			});
		} catch (error) {
			return error.response;
		}
	},

	Delete: async function(url, headers) {}
};

export default ServiceProvider;
