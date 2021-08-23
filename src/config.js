import axios from 'axios';

let apiUrl = 'https://testproject-api-v2.strv.com';

// ===> URL Configuration for development
const eventioApi = axios.create({
    baseURL: apiUrl,
});
eventioApi.interceptors.request.use(function (config) {

    config.headers["Content-Type"] = `application/json`;
    config.headers["APIKey"] = `8bbe1daa454b5960bd6fadc10b9ac1220771110d`;
    
    return config;
});

export { eventioApi };
