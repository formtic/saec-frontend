import api from '../config/interceptor.js';
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTc0OTE4MDQ3MSwiZXhwIjoxNzQ5MTg0MDcxfQ.lu0FlSTa4SSrFkof4exOKnHFMW0tXjClgtT5vZRxar4"
export function findAll() {
    return api.get(`${BASE_URL}/department/list`,
        {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        });
}