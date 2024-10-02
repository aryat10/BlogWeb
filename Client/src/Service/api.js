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

axiosInstance.interceptors.request.use(
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
        return Promise.reject(processError(error)); // Use processError for error
    }
)

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data } // Corrected to use response data
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.statusText, // Use statusText
            code: response?.status // Use status for code
        }
    }
}

const processError = (error) => {
    if (error.response) {
        console.log('Error in RESPONSE', error.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if (error.request) {
        console.log('Error in REQUEST', error.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ''
        }
    } else {
        console.log('Error in NETWORK', error.toJSON()) // Fixed typo
        return {
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
            data: body, // Added the missing comma
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) { // Fixed function definition
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress: function (progressEvent) { // Fixed function definition
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            }
        })
    }
}

export { API }
