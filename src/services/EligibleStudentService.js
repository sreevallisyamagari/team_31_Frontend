import axios from "axios";

const BASE_URL = "https://team31backend-production.up.railway.app/api/admin";

export const getEligibleStudents = (driveId) => {
    return axios.get(`${BASE_URL}/eligible/${driveId}`);
};