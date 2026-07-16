import axios from "axios";

const BASE_URL = "http://localhost:8080/api/admin";

export const getEligibleStudents = (driveId) => {
    return axios.get(`${BASE_URL}/eligible/${driveId}`);
};