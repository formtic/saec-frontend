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
    console.log("Datos del usuario a enviar:", payload);
    var formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    formData.append('fullName', payload.fullName);
    formData.append('email', payload.email);
    formData.append('image', payload.image);
    // Solo agrega la imagen si existe
    if (payload.image) {
        formData.append('image', payload.image);
    }

    return api.post(`${BASE_URL}/teacher/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

}

export function filterTeachers(name, page, pageSize, sortDirection) {
    return api.get(`${BASE_URL}/teacher/filter`, {
        params: { name, page, pageSize, sortDirection }
    });
}