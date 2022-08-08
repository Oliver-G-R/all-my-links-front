import axios from 'axios'
const urlApi = import.meta.env.VITE_API_URL

export const linksApi = axios.create({
    baseURL: urlApi
})
