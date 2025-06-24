import api from "../config/interceptor"
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export async function login(payload) {
    return await api.post(`${BASE_URL}/auth/login`, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const token = response.data.token;
        localStorage.setItem('authToken', token)
        window.location.href = '/';
    });
}

export async function logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/';
}