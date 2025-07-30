import api from "../config/interceptor"
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export async function login(payload) {
    return await api.post(`${BASE_URL}/auth/login`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': undefined
        }
    }).then(response => {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        window.location.href = '/';
    });
}

export async function logout() {
    localStorage.removeItem('authToken');

    // Elimina el token de los headers comunes
    delete api.defaults.headers.common['Authorization'];

    window.location.href = '/';
}
