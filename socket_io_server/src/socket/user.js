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
      friends.data.forEach((item) => {
        const sockets = [...io.sockets.sockets.values()];
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
export function logout(socket, io) {
  socket.on("logout", (data) => {
    const { id, username } = data;
    //   查找当前所有用户队列
    const friends = new Promise((resolve, reject) => {
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
      friends.data.forEach((item) => {
        const sockets = [...io.sockets.sockets.values()];
        const filterSocket = sockets.find(
          (socket) => socket.userId == item.receiveId
        );
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
