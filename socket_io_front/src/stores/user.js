/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 10:40:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-09 12:04:18
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\src\stores\counter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { getUserinfo } from "@/utils/api/user";
import { getSocket, createSocketFn } from "@/socket";
export const useUserStore = defineStore("userinfo", () => {
  const user = reactive({
    info: {},
  });
  const username = computed(() => {
    return user.info.username || "";
  });
  async function setUserInfo() {
    const { data: resp } = await getUserinfo();
    const { data } = resp;
    user.info = data;
    if (user.info.id) {
      const socket = getSocket();
      // 手动检查连接状态
      if (socket) {
        //登录后，手动再次进入登录页面后(不在进行登录)
        //手动刷新，有时候不执行connect事件，
        //connected连接状态是true，因此需要再次出发login事件，让后端socket重新挂载userId
        console.log("重新连接...");
        socket.emit("login", {
          id: user.info.id,
          username: user.info.username,
        });
      } else {
        createSocketFn();
        const socket = getSocket();
        socket.on("connect", () => {
          //只会执行一次
          console.log("连接成功");
          socket.emit("login", {
            id: user.info.id,
            username: user.info.username,
          });
        });
      }
    }
  }
  async function updateGetUserInfo() {
    const { data: resp } = await getUserinfo();
    const { data } = resp;
    user.info = data;
  }
  function resetUserInfo() {
    user.info = {};
  }
  return { user, username, setUserInfo, resetUserInfo, updateGetUserInfo };
});
