/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 10:40:31
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 14:57:33
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "path";
import pxtovw from "postcss-px-to-viewport";
const loder_pxtovw = pxtovw({
  //这里是设计稿宽度 自己修改
  viewportWidth: 1536,
  viewportUnit: "vw",
});
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const { BASE_URL, VITE_BASE_API_URL } = env;
  return {
    plugins: [vue(), vueDevTools()],
    css: {
      postcss: {
        plugins: [loder_pxtovw],
      },
    },
    base: "/",
    build: {
      outDir: path.resolve(__dirname, "../socket_io_server/src/public/"), //打包路径,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 5175,
      proxy: {
        [VITE_BASE_API_URL]: {
          target: BASE_URL,
          changeOrigin: true,
          // 因为此处代理时候，/api是后端也有/api字段开头，因此要进行重写以/api开头
          // 如果后端接口不是以/api开头，那就为rewrite: (path) => path.replace(/^\/api/, ""),
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
  };
  // ......其他配置
});
