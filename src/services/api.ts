import axios from "axios";
import { AppError } from "@utils/AppError";
const api = axios.create({
    baseURL: 'http://192.168.18.215:3333'
});
api.interceptors.request.use((config) => {
    console.log('Starting Request', JSON.stringify(config, null, 2))
    return config
},(error) => {
    console.log('Starting Request', JSON.stringify(error, null, 2))
    return Promise.reject(error);
})
api.interceptors.response.use(
    response => response, error => {
        if (error.response && error.response.data) {
            return Promise.reject(new AppError(error.response.data.message));
        } else {
            return Promise.reject(error);
        }
    })

export { api };