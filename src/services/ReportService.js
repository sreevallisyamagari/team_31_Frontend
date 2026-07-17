import axios from "axios";

const BASE_URL = "http://localhost:8080/api/reports";

export const getReport = () => {
    return axios.get(BASE_URL);
};