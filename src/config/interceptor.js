import axios from 'axios';
import notification from '../plugins/notification';

const api = axios.create({});

//  Verifica si hay un token en localStorage al iniciar
const token = localStorage.getItem('authToken');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

api.interceptors.response.use(
    response => {
        if (response.data.status && response.data.status !== 200) {
            notification.success({
                title: `Éxito ${response.data.status}`,
                content: response.data.message,
                duration: 2000
            });
        }

        return response.data;
    },
    error => {
        if (error.response && error.response.data) {
            notification.error({
                title: `Error ${error.response.data.status}`,
                content: error.response.data.message,
                duration: 5000
            });
        } else {
            notification.error({
                title: 'ERROR!',
                content: 'Ha ocurrido un error inesperado'
            });
        }

        return Promise.reject(error);
    }
);

export default api;
