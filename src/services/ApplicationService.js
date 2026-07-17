import axios from "axios";

const BASE_URL = "http://localhost:8080/api/applications";

// Student Apply
export const applyJob = (studentId, driveId) => {
    return axios.post(BASE_URL, {
        studentId,
        driveId
    });
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

// Applications By Status
export const getApplicationsByStatus = (status) => {
    return axios.get(`${BASE_URL}/status/${status}`);
};

// Update Status
export const updateStatus = (id, status) => {
    return axios.put(`${BASE_URL}/${id}?status=${status}`);
};