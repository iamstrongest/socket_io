/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 10:40:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 13:37:53
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\src\stores\counter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { getRoomList } from "@/utils/api/chat";
export const useChatStore = defineStore("chat", () => {
  const chatActive = ref(-1);
  const activeRoomId = ref();
  const roomList = ref([]);
  function updateChatActive(id) {
    chatActive.value = id;
  }

  async function getRoomDataList(params) {
    const { data: resp } = await getRoomList(params);
    const { data } = resp;
    if (resp.code === 200) {
      roomList.value = data;
    }
    if (data.length == 0) {
      alert(resp.message);
    }
  }
  function updateRoomList(params) {
    roomList.value.forEach((room) => {
      if (room.roomId === params.roomId) {
        room.conment = params.conment;
      }
    });
  }
  function updateActiveRoomId(roomId) {
    activeRoomId.value = roomId;
  }
  return {
    chatActive,
    roomList,
    activeRoomId,
    updateActiveRoomId,
    getRoomDataList,
    updateChatActive,
    updateRoomList,
  };
});
