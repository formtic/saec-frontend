import api from "../config/interceptor";
const BASE_URL = import.meta.env.VITE_SPRING_API_URL;

export function filter(name, page, pageSize, sortDirection) {
    return api.get(`${BASE_URL}/job/filter`, {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            name,
            page,
            pageSize,
            sortDirection
        }
    });
}

export function create(payload) {
    return api.post(`${BASE_URL}/job/create`, payload,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
}

export function update(payload, id) {
    return api.put(`${BASE_URL}/job/update/${id}`, payload,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
}

export function findById(id) {
    return api.get(`${BASE_URL}/job/findbyid/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export function findAllJobs(){
    const token = localStorage.getItem('authToken');
    return api.get(`${BASE_URL}/job/list`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    });
}