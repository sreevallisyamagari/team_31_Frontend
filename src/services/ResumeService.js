import axios from "axios";

const BASE_URL = "https://team31backend-production.up.railway.app/api/resume";

export const uploadResume = (studentId, file) => {

    const formData = new FormData();

    formData.append("file", file);

    return axios.post(
        `${BASE_URL}/upload/${studentId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

};

export const viewResume = (studentId) => {
    return `${BASE_URL}/view/${studentId}`;
};

export const downloadResume = (studentId) => {
    return `${BASE_URL}/download/${studentId}`;
};