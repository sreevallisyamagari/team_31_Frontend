import axios from "axios";

const BASE_URL = "https://team31backend-production.up.railway.app/api/reports";

export const getReport = () => {
    return axios.get(BASE_URL);
};