/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-23 14:59:19
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-09 10:06:24
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\utils\socket.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { io } from "socket.io-client";
let socket;
const ioBaseUrl =
  import.meta.env.MODE == "development"
    ? "http://localhost:3030?websiteTitle=LoveChat"
    : "/";
export function createSocketFn() {
  if (!socket) {
    socket = io(ioBaseUrl);
  }
  return socket;
}
export function getSocket() {
  if (!socket) {
    return createSocketFn();
  }
  return socket;
}
export function disConnectSocketFn(callback) {
  if (socket) {
    socket.disconnect();
    callback && callback(socket);
    socket = null;
  }
}
