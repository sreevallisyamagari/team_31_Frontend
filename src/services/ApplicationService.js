import axios from "axios";

const BASE_URL = "http://localhost:8080/api/applications";

// Student Apply
export const applyJob = (application) => {
    return axios.post(BASE_URL, application);
};

// View All Applications
export const getAllApplications = () => {
    return axios.get(BASE_URL);
};

// Student Applications
export const getStudentApplications = (studentId) => {
    return axios.get(`${BASE_URL}/student/${studentId}`);
};

// Drive Applications
export const getDriveApplications = (driveId) => {
    return axios.get(`${BASE_URL}/drive/${driveId}`);
};

// Update Status
export const updateStatus = (id, status) => {
    return axios.put(`${BASE_URL}/${id}?status=${status}`);
};