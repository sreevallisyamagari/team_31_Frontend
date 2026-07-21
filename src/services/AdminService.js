import axios from "axios";

const BASE_URL = "http://localhost:8080/api/admin";

// Dashboard
export const getDashboard = () => {
    return axios.get(`${BASE_URL}/dashboard`);
};

// Get All Students
export const getAllStudents = () => {
    return axios.get(`${BASE_URL}/students`);
};

// Get Student By ID
export const getStudentById = (id) => {
    return axios.get(`${BASE_URL}/student/${id}`);
};

// Update Student
export const updateStudent = (id, student) => {
    return axios.put(`${BASE_URL}/student/${id}`, student);
};

// Delete Student
export const deleteStudent = (id) => {
    return axios.delete(`${BASE_URL}/student/${id}`);
};

// =================== ADMIN MANAGEMENT ===================

// Create Admin
export const createAdmin = (admin) => {
    return axios.post(`${BASE_URL}/create-admin`, admin);
};

// Get All Admins
export const getAllAdmins = () => {
    return axios.get(`${BASE_URL}/all-admins`);
};

// Update Admin
export const updateAdmin = (id, admin) => {
    return axios.put(`${BASE_URL}/update-admin/${id}`, admin);
};

// Delete Admin
export const deleteAdmin = (id) => {
    return axios.delete(`${BASE_URL}/delete-admin/${id}`);
};