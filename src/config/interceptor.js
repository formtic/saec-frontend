import axios from 'axios';
import notification from '../plugins/notification';

const api = axios.create({});

api.interceptors.response.use(response => {
    if (response.error) {
        notification.error({
            title: `Error ${response.status}`,
            content: response.message,
        });
    } else {
        notification.success({
            title: `Éxito ${response.status}`,
            content: response.message,
            duration: 2000
        });
    }

    return response.data;
},
error => {
    notification.error({
        title: 'ERROR!',
        content: 'Ha ocurrido un error inesperado'
    });
    return error;
}
);

export default api;