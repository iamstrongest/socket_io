import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "@/stores";
import "@/assets/css/iconfont"
import data from "../public/version.json";
const app = createApp(App);
app.config.globalProperties.$timestamp = data.timestamp;
window.__VUE_APP__ = app;
app.use(router).use(pinia);

app.mount("#app");
