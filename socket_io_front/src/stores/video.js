/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 10:40:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-26 16:35:12
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\src\stores\counter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { getUuid, randomStr } from "@/utils/utilFn.js";
export const useVideoStore = defineStore("video", () => {
  const videoRoomId = ref();
  const receiveId = ref();
  const sendId = ref();
  const isReceived = ref(false);
  function createVidemoRoomId() {
    videoRoomId.value = getUuid() + randomStr(6, 8);
  }
  function setVideoRoomReceiveId(params) {
    receiveId.value = params;
  }
  function setVideoRoomSendId(params) {
    sendId.value = params;
  }
  function setIsReceived(params) {
    isReceived.value = params;
  }
  return {
    videoRoomId,
    receiveId,
    sendId,
    isReceived,
    createVidemoRoomId,
    setVideoRoomReceiveId,
    setVideoRoomSendId,
    setIsReceived,
  };
});
