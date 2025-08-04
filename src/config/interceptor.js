import axios from 'axios';
import notification from '../plugins/notification';
import { startLoop, stopLoop } from '../compose/utils/loadingBarAnimation';

const api = axios.create({});

api.interceptors.request.use(options => {
    startLoop();
    return options;
}, error => { return Promise.reject(error)});

api.interceptors.response.use(
    response => {
        if (response.data.status && response.data.status !== 200) {
            notification.success({
                title: `Éxito ${response.data.status}`,
                content: response.data.message,
                duration: 2000
            });
        }
        stopLoop();
        return response.data;
    },
    error => {
        stopLoop();
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
