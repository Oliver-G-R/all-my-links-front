import axios from 'axios'

export const linksApi = axios.create({
    baseURL: 'http://localhost:4000/all-my-links-api/v1'
})
