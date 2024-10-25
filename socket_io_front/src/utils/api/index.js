/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-03-09 16:39:50
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-22 15:37:06
 * @FilePath: \Front-end\uni-app\uni-project\admin\src\utils\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import { httpCode } from "@/config/constraint";
import { useUserStore } from "@/stores/user";
import pinia from "@/stores/index";
import router from "@/router";
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 30000,
});
service.interceptors.request.use(
  function (config) {
    const userStore = useUserStore(pinia);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = token;
      if (userStore?.user?.info?.uuid) {
        config.headers.uuid = userStore?.user?.info?.uuid;
      }
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  async (response) => {
    const {
      data: { code },
    } = response;
    if (code !== 200) {
      alert(httpCode[code]);
    }
    if (code == 401 || code == 427) {
      localStorage.removeItem("token");
      router.push("/login");
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default service;
