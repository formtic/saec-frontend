import api from "../config/interceptor";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export function createCourseSection(payload) {
    return api.post(`${BASE_URL}/coursesection/create`, payload);
}

export function findSectionsByCourseId(id) {
    return api.get(`${BASE_URL}/coursesection/findbycourseid/${id}`);
}

export function findSectionDetailsById(id) {
    return api.get(`${BASE_URL}/coursesection/detailsbyid/${id}`);
}