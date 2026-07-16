import axios from "axios";

const BASE_URL = "http://localhost:8080/api/support";

// Student submits ticket
export const submitTicket = (ticket) => {
    return axios.post(BASE_URL, ticket);
};

// Student views own tickets
export const getStudentTickets = (studentId) => {
    return axios.get(`${BASE_URL}/student/${studentId}`);
};

// Admin views all tickets
export const getAllTickets = () => {
    return axios.get(BASE_URL);
};

// Admin marks ticket as resolved
export const resolveTicket = (id) => {
    return axios.put(`${BASE_URL}/${id}`);
};