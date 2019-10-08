import axios from "axios";
import { API_BASE_URL } from "./constants.util";

axios.interceptors.request.use(
	config => {
		if (global.account != null && global.account.token !== "") {
			config.headers["authorization"] = global.account.token;
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
			const response = await axios.get(`${API_BASE_URL}/${url}`, {
				headers
			});
			//console.log("TCL: reponse", response);
			return response;
		} catch (error) {
			console.log(error.response);
			return error.response;
		}
	},

	POST: async function(url, object, headers) {
		try {
			const response = await axios.post(`${API_BASE_URL}/${url}`,object,{
				headers: headers
			});
			//console.log("TCL: reponse", response);
			return response;
		} catch (error) {
			console.log(error.response);
			return error.response;
		}
	},

	PUT: async function(url, object, headers) {
		try {
			const response = await axios.put(`${API_BASE_URL}/${url}`, object, {
				headers
			});
			//console.log("TCL: reponse", response);
			return response;
		} catch (error) {
			console.log(error.response);
			return error.response;
		}
	},

	Delete: async function(url, headers) {}
};

export default ServiceProvider;
