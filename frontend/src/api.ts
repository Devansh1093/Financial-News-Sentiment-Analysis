import axios from "axios";

let baseURL = "https://finance-backend-zys6.onrender.com";

if (import.meta.env.DEV) {
  baseURL = "http://127.0.0.1:8000";
}

if (import.meta.env.VITE_API_URL) {
  baseURL = import.meta.env.VITE_API_URL;
}

const api = axios.create({
  baseURL,
});

export default api;
