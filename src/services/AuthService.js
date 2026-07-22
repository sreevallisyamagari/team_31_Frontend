import axios from "axios";

const BASE_URL = "https://team31backend-production.up.railway.app/api/auth";

// Login
export const login = (loginData) => {
    return axios.post(`${BASE_URL}/login`, loginData);
};

// Student Registration
export const register = (studentData) => {
    return axios.post(`${BASE_URL}/register`, studentData);
};