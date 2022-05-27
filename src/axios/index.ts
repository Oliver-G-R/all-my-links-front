import axios from 'axios'

export const axiosConfig = axios.create({
    baseURL: 'http://localhost:4000/all-my-links-api/v1'
})
