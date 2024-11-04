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
export function ioInit(httpServer) {
  let io = new Server(httpServer, options);
  io.on("connection", (socket) => {
    // console.log(socket.id);// 获取当前socket本身给定的id
    console.log(io.sockets.adapter.rooms);// 获取所有房间
    // console.log(socket.handshake.query.username); //拼接在连接url后面的参数
    // console.log(io.sockets.adapter.rooms.get(roomId));// 获取某个特定的房间
    // io.sockets.adapter.rooms.delete(id); // 删除某个房间
    // socket.leave(id); // 将某个房间的特定的连接的websocket对象断开，和上面一样的
    //  用户登录后，就创建消息队列房间
    login(socket, io);
    sendNotify(socket, io);
    sendSingleChat(socket, io);
    sendGroupChat(socket, io);
    logout(socket, io);
    socket.on("disconnect", () => {
      // socket.leave(socket.userId); // 将某个房间的特定的连接的websocket对象断开
      console.log(`socket:${socket.id} -- client disconnected`);
      // 处理客户端断开连接后的逻辑
    });
    socket.on("error", (error) => {
      console.error("A server-side error occurred:", error);
      // 处理服务器端错误逻辑
    });
  });
}
