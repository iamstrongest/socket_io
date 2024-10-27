/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 10:40:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-26 10:48:03
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "@/stores";
import "@/assets/iconfont/iconfont";
import data from "../public/version.json";
// import "../service-worker";
const app = createApp(App);
app.config.globalProperties.$timestamp = data.timestamp;
window.__VUE_APP__ = app;
app.use(router).use(pinia);
app.mount("#app");
