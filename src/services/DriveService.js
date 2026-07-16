import axios from "axios";

const BASE_URL = "http://localhost:8080/api/drives";

// View All Drives
export const getAllDrives = () => {
    return axios.get(BASE_URL);
};

// View Drive By Id
export const getDriveById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

// Add Drive
export const addDrive = (drive) => {
    return axios.post(BASE_URL, drive);
};

// Update Drive
export const updateDrive = (id, drive) => {
    return axios.put(`${BASE_URL}/${id}`, drive);
};

// Delete Drive
export const deleteDrive = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};