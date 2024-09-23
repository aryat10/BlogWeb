

export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded'
    },
    success: {
        title: 'Success',
        message: 'Data loaded successfully'
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occured while fetching data... try aftr somw time '
    }
    ,
    requestFailure: {
        title: 'Error',
        message: 'An error occured while parsing request data '
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect... please check internet connection'
    }
}

// NEED SERVICE CALL: {url: '/',method: 'POST/GET/PUT/DELETE}

export const SERVICE_URL = {
    userSignup: { url: '/signup', method: 'POST' }
}