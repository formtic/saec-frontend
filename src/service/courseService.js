import api from "../config/interceptor";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export function create(payload) {
    const token = localStorage.getItem('authToken');
    return api.post(`${BASE_URL}/course/create`, payload, {
        headers: {
            'Content-Type': 'application/json',

        }
    });
}

export function filter(name, page, pageSize, sortDirection) {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/course/filter`, {
        headers: {
            'Content-Type': 'application/json',

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

        }
    });
}

export function updateInfo(payload, id) {
    const token = localStorage.getItem('authToken');
    return api.put(`${BASE_URL}/course/updateinfo/${id}`, payload, {
        headers: {
            'Content-Type': 'application/json',

        }
    }
    );
}


