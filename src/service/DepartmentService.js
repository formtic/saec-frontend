import api from '../config/interceptor.js';
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTc0OTUyOTI5MiwiZXhwIjoxNzQ5NTMyODkyfQ.NLzXW3VSoCZGhZGmZoaKJFeehF3brPNY3JYn2tltuJA"


export function findAll() {
    return api.get(`${BASE_URL}/department/list`,
        {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        });
}

export function findById(id) {
    return api.get(`${BASE_URL}/department/findbyid/${id}`,
        {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export function create(payload) {
    return api.post(`${BASE_URL}/department/create`,
        payload,
        {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}

export function update(payload, id) {
    return api.put(`${BASE_URL}/department/update/${id}`,payload,
        {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    );
}