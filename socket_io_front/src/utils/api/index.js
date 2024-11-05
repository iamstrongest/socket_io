/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-03-09 16:39:50
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-05 17:04:34
 * @FilePath: \Front-end\uni-app\uni-project\admin\src\utils\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import { httpCode } from "@/config/constraint";
import router from "@/router";
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 30000,
});
service.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    const uuid = localStorage.getItem("uuid");
    if (!config.url.includes("/refresh")) {
      if (token) {
        config.headers.authorization = token;
      }
      if (uuid) {
        config.headers.uuid = uuid;
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
    if (code == 401) {
      const originalRequestConfig = response.config;
      console.log("token失效，使用refreshtoken");
      const {
        data: { code, refresh_token, token },
      } = await refreshFn("/refresh");
      if (code === 200) {
        storageFn(token, refresh_token);
        // 重新发送请求
        return service(originalRequestConfig);
      }
    }
    if (code == 406) {
      console.log("刷新token失效");
      clearStorageFn();
      alert(httpCode[406]);
      return router.push("/login");
    }
    if (code == 427) {
      alert(httpCode[427]);
      return router.push("/login");
    }
    if (code !== 200) {
      alert(httpCode[code]);
    }

    return response;
  },
  function (error) {
    alert("当前用户请过过多，服务器超时");
    return Promise.reject(error);
  }
);
async function refreshFn(url) {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) {
    return router.push("/login");
  }
  const res = await service.get(url, {
    headers: {
      refresh_token: refresh_token,
    },
  });
  return res;
}
export function storageFn(token, uuid, refresh_token) {
  if (token) {
    localStorage.setItem("token", token);
  }
  if (refresh_token) {
    localStorage.setItem("refresh_token", refresh_token);
  }
  if (uuid) {
    localStorage.setItem("uuid", uuid);
  }
}
export function clearStorageFn() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("uuid");
}
export default service;
