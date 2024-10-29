/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 10:40:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-20 18:08:31
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\src\stores\counter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { getUserinfo } from "@/utils/api/user";
import { socket } from "@/socket";
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
    socket.on("connect", () => {
      console.log(socket.connected); // true
      socket.emit("login", { id: data.id });
    });
  }
  function resetUserInfo() {
    user.info = {};
  }
  return { user, username, setUserInfo, resetUserInfo };
});
