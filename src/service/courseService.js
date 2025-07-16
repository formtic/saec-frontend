import api from "../config/interceptor";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export function create(payload) {
    const token = localStorage.getItem('authToken');
    return api.post(`${BASE_URL}/course/create`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export function filter(name, page, pageSize, sortDirection) {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/course/filter`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: {
            name, page, pageSize, sortDirection
        }
    });
}

export function findById(id) {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/course/findbyid/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export function updateInfo(payload, id) {
    const token = localStorage.getItem('authToken');
    return api.put(`${BASE_URL}/course/updateinfo/${id}`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    );
}

export function filterMyCourses(name, page, pageSize, sortDirection) {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/course/filter/mycourses`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: { name, page, pageSize, sortDirection }
    });
}