import axios from "axios";

axios.interceptors.request.use(
	config => {
		if(localStorage.getItem("account")){
			const STORED_ACCOUNT_INFO = JSON.parse(localStorage.getItem("account"));
			config.headers["authorization"] = STORED_ACCOUNT_INFO.token;
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
			return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/${resource}`,{
				headers
			});
		} catch (error) {
			return error.response;
		}
	},

	POST: async function(resource, object, headers ) {
		
		try {
			return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/${resource}`, object,{
				headers
			});
		} catch (error) {
			return error.response;
		}
	},

	PUT: async function(resource, object, headers) {
		try {
			return await axios.put(`${process.env.REACT_APP_API_BASE_URL}/${resource}`, object,{
				headers
			});
		} catch (error) {
			return error.response;
		}
	},

	Delete: async function(resource, headers) {}
};

export default ServiceProvider;
