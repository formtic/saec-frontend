import api from "../config/interceptor";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;
import { jwtDecode } from "jwt-decode";


export function filter(name, page, pageSize, sortDirection) {
    const token = localStorage.getItem('authToken');

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    return api.get(`${BASE_URL}/courseassigment/filter`, {
        params: {
            name, page, pageSize, sortDirection,userId
        }
    });
}