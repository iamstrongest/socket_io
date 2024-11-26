/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-23 13:54:10
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-09 10:28:02
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\socket\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Server } from "socket.io";
import { serverConfig } from "../config/constraint.js";
// highlight-start
const options = {
  cors: {
    origin: serverConfig.socketOrigin,
    credentials: true,
  },
};
import { login, logout } from "./user.js";
import { sendSingleChat, sendGroupChat } from "./chat.js";
import { sendNotify } from "./notify.js";
import { webRtc } from "./webRtc.js";
export function ioInit(httpServer) {
  let io = new Server(httpServer, options);
  io.on("connection", (socket) => {
    // socket.id
    //  此id在每次重新连接后重新生成（例如，当 WebSocket 连接被切断时，或当用户刷新页面时）
    // 两个不同的浏览器选项卡将具有两个不同的 ID
    // 服务器上没有为给定 ID 存储消息队列（即，如果客户端断开连接，则从服务器发送到此 ID 的消息将丢失）
    // console.log(socket.id);// 获取当前socket本身给定的id
    // console.log(socket.handshake.query); //拼接在连接url后面的参数
    // console.log(io.sockets.adapter.rooms.get(roomId));// 获取某个特定的房间
    // io.sockets.adapter.rooms.delete(id); // 删除某个房间
    // socket.leave(id); // 将某个房间的特定的连接的websocket对象断开，和上面一样的
    //  用户登录后，就创建消息队列房间
    login(socket, io);
    sendNotify(socket, io);
    sendSingleChat(socket, io);
    sendGroupChat(socket, io);
    logout(socket, io);
    webRtc(socket, io);
    // console.log(transport);
    // 当 WebSocket 连接被切断时，或当用户刷新页面时会触发disconnect事件
    socket.on("disconnect", (reason, details) => {
      // console.log(`reason-->`, reason);
      // socket.leave(socket.userId); // 将某个房间的特定的连接的websocket对象断开
      console.log(`socket:${socket.id} -- client disconnected`);
      console.log(`用户ID-->${socket.userId} -- 断开了连接`);
      console.log(`用户名-->${socket.username} -- 断开了连接`);
      // console.log(`socket.userId:${socket.userId} -- client disconnected`);
      // 处理客户端断开连接后的逻辑
    });
    socket.on("error", (error) => {
      console.error("A server-side error occurred:", error);
      // 处理服务器端错误逻辑
    });
  });
}
