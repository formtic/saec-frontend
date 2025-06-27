import api from "../config/interceptor";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export function findTestsByStatus(status) {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/test/findbystatus/${status}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}