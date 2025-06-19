            <template>
                <div>
                    <div style="display: flex; width: 100%; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <n-input v-model:value="answer.text" placeholder="Posible respuesta" type="textarea" />
                    </div>
                    <h3 class="text-center w-full font-normal n-mb-6 " style="color: #778C96;">
                        La respuesta correcta es solamente una propuesta, la respuesta debera ser revisada manualmente.
                    </h3>
                </div>
            </template>

            <script>
            import { defineComponent, ref } from "vue";
            import { NInput } from "naive-ui";

            export default defineComponent({
                components: {
                    NInput,
                },
                setup() {
                    const answer = ref({ text: '' });
                    return {
                        answer,
                    };
                }
            });
            </script>