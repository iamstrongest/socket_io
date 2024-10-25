/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 10:40:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 14:41:20
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\src\stores\counter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { getNotifiy, confirmNotifiy } from "@/utils/api/notify";
import { socket } from "@/utils/socket";
import { useUserStore } from "@/stores/user.js";
export const useNotifyStore = defineStore("notify", () => {
  const asideActive = ref(1);
  const notify = reactive({
    unreadNum: 0,
    data: [],
  });
  const userStore = useUserStore();
  async function setNotifiy() {
    notify.unreadNum = 0;
    const params = { receiveId: userStore.user.info.id };
    const { data: resp } = await getNotifiy(params);
    const { data } = resp;
    notify.data = data;
    data.forEach((item) => {
      if (item.status == 0) {
        notify.unreadNum = notify.unreadNum + 1;
      }
    });
  }
  // 更改通知
  async function updateNotifiy(data) {
    notify.data.forEach((item) => {
      if (item.id == data.id) {
        item.status = data.status;
        notify.unreadNum--;
      }
    });
    await confirmNotifiy(data);
  }
  // 插入通知
  function addNotifiy(data) {
    notify.data.unshift(data);
    notify.unreadNum = notify.unreadNum + 1;
  }
  function updateAsideActive(id) {
    asideActive.value = id;
  }
  return {
    asideActive,
    notify,
    setNotifiy,
    updateNotifiy,
    addNotifiy,
    updateAsideActive,
  };
});
