<style></style>

<script>
import { createApp, h, onBeforeUpdate, onMounted, ref, watchEffect, inject, watch } from "vue/dist/vue.esm-bundler";

export default {
    name: "AppIframe",
    props: {
        css: { type: String },
        indexOfBlock: { type: Number },
    },
    emits: ["openNewWindow"],

    setup(props, { slots, emit }) {
        const iframeRef = ref(null);
        const iframeBody = ref(null);
        const iframeHead = ref(null);
        const iframeStyle = ref(null);
        let iframeApp = null;

        let iframeWindow = ref(null);
        let iframeWindowBody = ref(null);
        let iframeWindowHead = ref(null);
        let iframeWindowStyle = ref(null);
        let iframeWindowApp = null;

        const isOpenNewWindow = inject("isOpenNewWindow");

        onMounted(() => {
            iframeBody.value = iframeRef.value.contentDocument.body;
            iframeHead.value = iframeRef.value.contentDocument.head;

            const link = document.createElement("link");

            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = "/admin/styles/iframe.css";

            iframeHead.value.appendChild(link);

            const el = document.createElement("div");
            el.setAttribute("id", "getHeight");
            iframeBody.value.appendChild(el);
            iframeStyle.value = document.createElement("style");
            iframeStyle.value.innerHTML = props.css;
            iframeHead.value.appendChild(iframeStyle.value);

            iframeApp = createApp({
                name: "iframeRender",

                setup() {
                    return () => slots.default();
                },
            }).mount(el);
        });
        onBeforeUpdate(() => {
            if (!iframeApp || !iframeRef.value) {
                return;
            }
            if (props.css) {
                iframeStyle.value.innerHTML = props.css;
            }
        });

        function openPortal() {
            iframeWindow.value = window.open("", "", "width=600,height=400,left=200,top=200");
            iframeWindow.value.name = "Предпросмотр";
            iframeWindow.value.addEventListener("beforeunload", () => {
                emit("openNewWindow");
            });

            iframeWindowBody.value = iframeWindow.value.document.body;
            iframeWindowHead.value = iframeWindow.value.document.head;

            const winEl = document.createElement("div");

            iframeWindowBody.value.appendChild(winEl);
            iframeWindowStyle.value = document.createElement("style");

            iframeWindowStyle.value.innerHTML = props.css;
            iframeWindowHead.value.appendChild(iframeWindowStyle.value);

            iframeWindowApp = createApp({
                name: "iframeRender",

                setup() {
                    return () => slots.default();
                },
            }).mount(winEl);
        }
        function closePortal() {
            if (iframeWindow.value) {
                iframeWindow.value.close();
                iframeWindow.value = null;
            }
        }

        watchEffect(() => {
            if (isOpenNewWindow.value) {
                openPortal();
            } else {
                closePortal();
            }
        });

        return () => h("iframe", { ref: iframeRef });
    },
};
</script>
