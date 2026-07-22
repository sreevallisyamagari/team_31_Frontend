import axios from "axios";

const BASE_URL = "https://team31backend-production.up.railway.app/api/notifications";

export const getNotifications = (studentId) =>
    axios.get(`${BASE_URL}/${studentId}`);

export const getUnreadCount = (studentId) =>
    axios.get(`${BASE_URL}/unread/${studentId}`);

export const markAsRead = (id) =>
    axios.put(`${BASE_URL}/read/${id}`);