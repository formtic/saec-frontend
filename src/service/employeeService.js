import api from "../config/interceptor.js";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;
export function createEmployee(payload) {


    return api.post(`${BASE_URL}/employee/create`, payload);
}

export function filterEmployees(name, department, job, page, pageSize, sortDirection) {
    return api.get(`${BASE_URL}/employee/filter`, { params: { name, department, job, page, pageSize, sortDirection } });
}