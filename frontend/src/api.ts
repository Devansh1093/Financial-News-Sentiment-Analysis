import axios from "axios";


const api = axios.create({
    baseURL:  "https://finance-backend-zys6.onrender.com",

});

export default api;