import api from "../config/interceptor";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export function findAllByStatus(status) {
    return api.get(`${BASE_URL}/teacher/findbystatus/${status}`,
        {
            headers: {
                'Content-Type': 'application/json',
               
            }
        }
    );
}

export function createTeacher(payload) {
    return api.post(`${BASE_URL}/teacher/create`, payload);
}

export function filterTeachers(name, page, pageSize, sortDirection) {
    return api.get(`${BASE_URL}/teacher/filter`, {
        params: {name, page, pageSize, sortDirection}
    });
}