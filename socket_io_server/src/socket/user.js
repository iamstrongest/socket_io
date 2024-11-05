/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-11-03 21:43:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-05 19:30:28
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\socket\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import db from "../db/index.js";
export function login(socket, io) {
  socket.on("login", async (data) => {
    // 一个用户ID,对应一条持久化在线提示
    const { id } = data;
    socket.userId = id;
    // socket.join(id); //自己新创建一个房间，否者使用原先给定的，一旦前端刷新，房间就会被销毁
    // 查找登录者
    const user = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM user where id=?`;
      db.query(sql, [id], (err, rows) => {
        if (err) return console.log(err.message);
        resolve(rows[0]);
      });
    });
    //   查找当前所有用户队列
    const friends = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM friend where sendId=? and status=?`;
      db.query(sql, [id, 2], (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.length > 0) {
          resolve({
            data: rows,
            length: rows.length,
          });
        } else {
          resolve({
            data: [],
            length: 0,
          });
        }
      });
    });
    if (friends.length > 0) {
      const sockets = [...io.sockets.sockets.values()];
      friends.data.forEach((item) => {
        const filterSocket = sockets.find(
          (socket) => socket.userId == item.receiveId
        );
        if (filterSocket) {
          io.to(filterSocket.id).emit("friend_login", {
            msg: `您的好友-${user.username}-上线啦`,
          });
        }
        // io.to(item.receiveId).emit("friend_login", {
        //   msg: `您的好友-${user.username}-上线啦`,
        // });
      });
    }
  });
}
export async function logout(socket, io) {
  socket.on("logout", async (data) => {
    const { id, username } = data;
    //   查找当前所有用户队列
    const friends = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM friend where sendId=? and status=?`;
      db.query(sql, [id, 2], (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.length > 0) {
          resolve({
            data: rows,
            length: rows.length,
          });
        } else {
          resolve({
            data: [],
            length: 0,
          });
        }
      });
    });
    if (friends.length > 0) {
      const sockets = [...io.sockets.sockets.values()];
      friends.data.forEach((item) => {
        const filterSocket = sockets.find((socket) => {
          return socket.userId == item.receiveId;
        });
        if (filterSocket) {
          io.to(filterSocket.id).emit("friend_logout", {
            msg: `您的好友-${username}-下线啦`,
          });
        }
        // io.to(item.id).emit("friend_logout", {
        //   msg: `您的好友-${username}-下线啦`,
        // });
      });
    }
    socket.leave(id); // 将某个房间的特定的连接的websocket对象断开
  });
}
