import api from "../config/interceptor";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export function filter(name, page, pageSize, sortDirection) {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/job/filter`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        params: {
            name,
            page,
            pageSize,
            sortDirection
        }
    });
}