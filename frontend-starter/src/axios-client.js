import axios from 'axios';
import endpoint from './data/server.js';

const axiosClient = axios.create({
  baseURL: endpoint.baseUrl
})

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  return config
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  try {
    const {response} = error
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  } catch (e) {
    console.error(e)
  }

  throw error
})

export default axiosClient
