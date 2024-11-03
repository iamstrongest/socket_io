/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 10:40:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-03 11:33:04
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\src\stores\counter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { getRoomList } from "@/utils/api/chat";
import { getGroupRoomLastChatList } from "@/utils/api/group_chat";
export const useChatStore = defineStore("chat", () => {
  const chatActive = ref(-1);
  const activeRoomId = ref();
  const roomList = ref([]);
  const chatList = ref([]);
  function updateChatActive(id) {
    chatActive.value = id;
  }
  async function getSingleRoomDataList(params) {
    const { data: resp } = await getRoomList(params);
    const { data } = resp;
    roomList.value = [...roomList.value, ...data];

    roomList.value.sort((room1, room2) => {
      return (
        new Date(room2.createdAt).getTime() -
        new Date(room1.createdAt).getTime()
      ); //按照创建时间降序排序
    });
  }
  async function getGroupRoomLastChatDataList(params) {
    const { data: resp } = await getGroupRoomLastChatList(params);
    const { data } = resp;
    roomList.value = [...roomList.value, ...data];
    roomList.value.sort((room1, room2) => {
      return (
        new Date(room2.createdAt).getTime() -
        new Date(room1.createdAt).getTime()
      ); //按照创建时间降序排序
    });
  }
  function updateRoomList(params) {
    roomList.value.forEach((room) => {
      if (room.roomId === params.roomId) {
        room.conment = params.conment;
        room.createdAt = params.createdAt;
      }
    });
    roomList.value.sort((room1, room2) => {
      return (
        new Date(room2.createdAt).getTime() -
        new Date(room1.createdAt).getTime()
      ); //按照创建时间降序排序
    });
  }
  function updateActiveRoomId(roomId) {
    activeRoomId.value = roomId;
  }
  function addAfterChat(data) {
    if (data instanceof Array) {
      chatList.value.push(...data);
      return;
    }
    chatList.value.push(data);
  }
  function addBeforeChat(data) {
    if (data instanceof Array) {
      chatList.value.unshift(...data);
      return;
    }
    chatList.value.push(data);
  }
  function resetRoomList() {
    roomList.value.length = 0;
  }
  function resetChatList() {
    chatList.value.length = 0;
  }
  return {
    chatActive,
    roomList,
    activeRoomId,
    chatList,
    updateActiveRoomId,
    getSingleRoomDataList,
    getGroupRoomLastChatDataList,
    updateChatActive,
    updateRoomList,
    addAfterChat,
    addBeforeChat,
    resetRoomList,
    resetChatList,
  };
});
