<template>
    <div class="main-container">
        <div class="content-container">
            <div class="section-details">
                <div class="video-container" v-if="sectionData.url_video">
                    <template v-if="isYouTube(sectionData.url_video)">
                        <iframe
                            :key="'yt-' + sectionData.id"
                            width="560"
                            height="315"
                            :src="getEmbedUrl(sectionData.url_video)"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </template>
                    <template v-else-if="isVideoFile(sectionData.url_video)">
                        <video 
                            :key="'vid-' + sectionData.id"
                            controls
                        >
                            <source :src="getFullUrl(sectionData.url_video)" type="video/mp4">
                            Tu navegador no soporta el elemento de video.
                        </video>
                    </template>
                </div>

                <div class="section-header">
                    <h1>{{ sectionData.order }} - {{ sectionData.name }}</h1>
                </div>

                <div class="section-description">
                    <p>{{ sectionData.description }}</p>
                </div>

                <div class="section-resources" v-if="sectionData.url_presentation">
                    <h3>Recursos de la sección:</h3>
                    <a
                        :href="getFullUrl(sectionData.url_presentation)"
                        target="_blank"
                        class="resource-link">
                        PDF de la presentación
                    </a>
                </div>
            </div>

            <div class="sections-list">
                <h3 class="list-title">Contenido del curso</h3>
                <div class="list-container">
                    <div
                        v-for="section in sections"
                        :key="section.id"
                        class="list-item"
                        :class="{ 'active': section.id === sectionData.id }"
                        @click="navigateToSection(section.id)">
                        <span>{{ section.order }}. {{ section.name }}</span>
                    </div>
                </div>
                <n-button @click="navigateToExam" type="primary" class="exam-button">
                    Ir al examen
                </n-button>
            </div>
        </div>
    </div>
</template>
<script>
import { findSectionDetailsById, findSectionsByCourseId } from '../../service/CourseSectionService';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NButton } from 'naive-ui';

const BASE_URL = import.meta.env.VITE_SPRING_FILES_URL;

export default {
    components: {
        NButton
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const sectionData = ref({
            id: '',
            name: '',
            description: '',
            order: 0,
            url_video: '',
            url_presentation: ''
        });

        const sections = ref([]);

        const getEmbedUrl = (url) => {
            const videoId = url.split('v=')[1]?.split('&')[0];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        };

        const getFullUrl = (relativePath) => {
            return `${BASE_URL}/${relativePath}?t=${Date.now()}`;
        };

        const isYouTube = (url) => {
            return url?.includes('youtube.com') || url?.includes('youtu.be');
        };

        const isVideoFile = (url) => {
            return url?.endsWith('.mp4');
        };

        const fetchSectionDetails = async (sectionId) => {
            try {
                const idToFetch = sectionId || route.params.sectionId;
                const response = await findSectionDetailsById(idToFetch);
                sectionData.value = response.data;
            } catch (error) {
                console.error('Error al obtener los detalles de la sección:', error);
            }
        };

        const fetchSectionsList = async () => {
            try {
                const courseId = route.params.courseId;
                const response = await findSectionsByCourseId(courseId);
                sections.value = response.data;
            } catch (error) {
                console.error('Error al obtener la lista de secciones:', error);
            }
        };

        const navigateToSection = (sectionId) => {
            const courseId = route.params.courseId;
            router.push(`/employee/courses/course-info/${courseId}/section/${sectionId}`);
        };

        const navigateToExam = () => {
            const courseId = route.params.courseId;
            router.push(`/employee/courses/course-info/${courseId}/exam`);
        };

        onMounted(async () => {
            await fetchSectionDetails();
            await fetchSectionsList();
        });

        watch(
            () => route.params.sectionId,
            async (newSectionId) => {
                if (newSectionId) {
                    await fetchSectionDetails(newSectionId);
                }
            },
            { immediate: true }
        );

        return {
            sectionData,
            sections,
            getEmbedUrl,
            getFullUrl,
            isYouTube,
            isVideoFile,
            navigateToSection,
            navigateToExam
        };
    }
}
</script>


<style scoped>
.main-container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 20px;
}

.content-container {
    display: flex;
    gap: 20px;
}

.section-details {
    flex: 2;
    background: white;
    border: 1px solid #eee;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.sections-list {
    flex: 1;
    background: white;
    border: 1px solid #eee;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
}

.list-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.list-container {
    flex-grow: 1;
    overflow-y: auto;
}

.list-item {
    padding: 10px 15px;
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.list-item:hover {
    background-color: #f5f5f5;
}

.list-item.active {
    background-color: #e6f7ff;
    font-weight: bold;
}

.exam-button {
    margin-top: 20px;
    width: 100%;
}

.section-header h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
}

.section-description p {
    font-size: 16px;
    line-height: 1.6;
    color: #555;
    margin-bottom: 30px;
}

.section-resources {
    margin-bottom: 30px;
}

.section-resources h3 {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
}

.resource-link {
    display: inline-block;
    padding: 8px 15px;
    background-color: #f0f0f0;
    color: #0066cc;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.resource-link:hover {
    background-color: #e0e0e0;
}

/* Estilo responsivo para video */
.video-container {
    margin-top: 10px;
    position: relative;
    padding-bottom: 56.25%; /* Relación 16:9 */
    height: 0;
    overflow: hidden;
    border-radius: 8px;
}

.video-container iframe,
.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

@media (max-width: 768px) {
    .content-container {
        flex-direction: column;
    }

    .section-details,
    .sections-list {
        width: 100%;
    }
}
</style>
