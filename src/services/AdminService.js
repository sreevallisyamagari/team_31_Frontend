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