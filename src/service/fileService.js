import api from "../config/interceptor";
const BASE_URL =  import.meta.env.VITE_SPRING_API_URL;

export function uploadSectionFiles(video, presentation) {
    const payload = new FormData();
    if(video)
    payload.append('fileVideo', video)

    payload.append('filePresentation', presentation);


    return api.post(`${BASE_URL}/files/upload`, payload,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}