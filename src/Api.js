import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // API adresiniz burada
});

export default api;
