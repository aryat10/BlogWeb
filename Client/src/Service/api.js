import axios from 'axios'
import { API_NOTIFICATION_MESSAGES, SERVICE_URL } from '../Constants/config'

const API_URL = `http://localhost:8000`

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})





axiosInstance.interceptors.request.use(               // axios instance for request part 
    function (config) { // Success case
        return config;
    },
    function (error) { // Error case
        return Promise.reject(error);
    }
)


axiosInstance.interceptors.response.use(
    function (response) {
        // Stop global loader here
        return processResponse(response);
    },
    function (error) {
        // Stop global loader here
         // Get the response from the error object
        return Promise.reject(processError(error)); // Use processError for error response
    }
);





const processResponse = (response) => {
    if (response?.status === 200) {
        return { 
            isSuccess: true,
            data: response.data 
        } // Corrected to use response data
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg, // Use statusText
            code: response?.code // Use status for code
        }
    }
}




const processError = (error) => {
    if (error.response) {
        // Requesst is made and server responded with a status other 
        console.log('Error in RESPONSE', error.toJSON())            // here request is successfull but server respond other thatn status 200
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if (error.request) {
        console.log('Error in REQUEST', error.toJSON())      // here no response is being received even after sending request
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ''
        }
    } else {
        console.log('Error in NETWORK', error.toJSON()) // Fixed typo
        return {                                             // Frontend error occured 
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ''
        }
    }
}





const API = {}

for (const [key, value] of Object.entries(SERVICE_URL)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        return axiosInstance({
            method: value.method,
            url: value.url,
            data: body,  // Ensure the body is passed correctly
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
        .then((response) => response.data)  // Return the response data
        .catch((error) => {
            // Handle and return error for further processing
            return Promise.reject(error.response ? error.response.data : error);
        });
    }
}

export { API }
