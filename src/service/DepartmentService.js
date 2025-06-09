import api from '../config/interceptor.js';
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTc0OTUxMTg1MiwiZXhwIjoxNzQ5NTE1NDUyfQ.qMtj8SX4K2svJZiHWKKS4CFyoq_MtzOL5VBUaJtsr-8"


export function findAll() {
    return api.get(`${BASE_URL}/department/list`,
        {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        });
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