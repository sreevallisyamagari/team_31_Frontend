import axios from "axios";

const BASE_URL = "http://localhost:8080/api/student";

export const getProfile = (id) => {
    return axios.get(`${BASE_URL}/profile/${id}`);
};

export const getDrives = () => {
    return axios.get(`${BASE_URL}/drives`);
};

export const getApplications = (studentId) => {
    return axios.get(`${BASE_URL}/applications/${studentId}`);
};

export const getNotifications = (studentId) => {
    return axios.get(`${BASE_URL}/notifications/${studentId}`);
};

export const getResults = (studentId) => {
    return axios.get(`${BASE_URL}/results/${studentId}`);
};
export const updateProfile = (id, profile) => {
    return axios.put(
        `http://localhost:8080/api/student/profile/${id}`,
        profile
    );
};