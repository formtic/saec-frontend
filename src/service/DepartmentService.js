import api from '../config/interceptor.js';
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;


export function findAllDepartments() {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/department/list`,
        {
            headers: {
                'Content-Type': 'application/json',

            }
        });
}

export function findById(id) {
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/department/findbyid/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',

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

            }
        }
    );
}