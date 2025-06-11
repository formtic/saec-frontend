import api from '../config/interceptor.js';
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;


export function findAll() {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/department/list`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
}

export function findById(id) {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/department/findbyid/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export function filter(name, page, pageSize, sortDirection) {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/department/filter`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                name,
                page,
                pageSize,
                sortDirection
            }
        }
    );
}

export function create(payload) {
    const token = localStorage.getItem('authToken');
    return api.post(`${BASE_URL}/department/create`,
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export function update(payload, id) {
    const token = localStorage.getItem('authToken');
    return api.put(`${BASE_URL}/department/update/${id}`, payload,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}