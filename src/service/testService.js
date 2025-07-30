import api from "../config/interceptor";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export function findTestsByStatus(status) {
    return api.get(`${BASE_URL}/test/findbystatus/${status}`,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
}


export function findTestByCouseseId(courseId) {
    return api.get(`${BASE_URL}/test/getbycourseid/${courseId}`);
}