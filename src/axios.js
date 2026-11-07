import axios from "axios";

const axiosInstance = axios.create({
  baseURL : 'https://6aef1933b9925b27ce16a3cc.mockapi.io',
  responseType : 'json'
})

export {axiosInstance};