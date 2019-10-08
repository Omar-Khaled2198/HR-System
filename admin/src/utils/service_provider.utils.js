import axios from "axios";
import {API_BASE_URL} from "./constants.utils";

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

	GET: async function(resource, headers) {
		try {
			return await axios.get(`${API_BASE_URL}/${resource}`,{
				headers
			});
		} catch (error) {
			return error.response;
		}
	},

	POST: async function(resource, object, headers ) {
		
		try {
			return await axios.post(`${API_BASE_URL}/${resource}`, object,{
				headers
			});
		} catch (error) {
			return error.response;
		}
	},

	PUT: async function(resource, object, headers) {
		try {
			return await axios.put(`${API_BASE_URL}/${resource}`, object,{
				headers
			});
		} catch (error) {
			return error.response;
		}
	},

	Delete: async function(resource, headers) {}
};

export default ServiceProvider;
