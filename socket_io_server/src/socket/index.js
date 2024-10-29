import { Server } from "socket.io";
import { serverConfig } from "../config/constraint.js";
// highlight-start
const options = {
  cors: {
    origin: serverConfig.socketOrigin,
    credentials: true,
  },
};
import db from "../db/index.js";
export function ioInit(httpServer) {
  let io = new Server(httpServer, options);
  io.on("connection", (socket) => {
    // console.log(socket.id);// 获取当前socket本身给定的id
    // console.log(io.sockets.adapter.rooms);// 获取所有房间
    // console.log(socket.handshake.query.username); //拼接在连接url后面的参数
    // console.log(io.sockets.adapter.rooms.get(roomId));// 获取某个特定的房间
    // io.sockets.adapter.rooms.delete(id); // 删除某个房间
    // socket.leave(id); // 将某个房间的特定的连接的websocket对象断开，和上面一样的
    //  用户登录后，就创建消息队列房间
    socket.on("login", async (data) => {
      // 一个用户ID,对应一条持久化在线提示
      const { id } = data;
      socket.join(id); //自己新创建一个房间，否者使用原先给定的，一旦前端刷新，房间就会被销毁
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
          io.to(item.receiveId).emit("friend_login", {
            msg: `您的好友-${user.username}-上线啦`,
          });
        });
      }
    });
    socket.on("send_chat", async (data) => {
      // 回应者的userId,以及回应者的sdp
      const { roomId, sendId, conment, receiveId, type } = data;
      const sql = `insert into single_chat(roomId,conment,sendId, receiveId,type) VALUES(?,?,?,?,?)`;
      //    插入聊天记录
      await new Promise((resolve, reject) => {
        db.query(
          sql,
          [roomId, conment, sendId, receiveId, type],
          (err, rows) => {
            if (err) return console.log(err.message);
            resolve();
          }
        );
      });
      const user = await new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user where id=?`;
        db.query(sql, [sendId], (err, rows) => {
          if (err) return console.log(err.message);
          resolve(rows[0]);
        });
      });
      const sendData = {
        roomId,
        sendId,
        conment,
        receiveId,
        sendIdUsername: user.username,
        sendIdAvatar: user.avatar,
        type,
        msg: `有信息请您注意查收`,
      };
      io.to(receiveId).emit("receive", sendData);
    });
    socket.on("send_notify", async (data) => {
      // 1. 系统通知 2. 好友申请通知 3.处理好友申请
      const { sendId, receiveId, conment } = data;
      const type = Number(data.type);
      let insertData = {};
      if (type == 1) {
        const ip = socket.handshake.address; // 获取用户的 IP 地址
        insertData = {
          sendId: sendId || -1, //默认-1是系统提供的通知
          username: "系统通知",
          receiveId,
          type,
          status: 0,
          conment: `$当前登录IP地址为:${ip}`,
        };
        const sql = `insert into notification(sendId, receiveId, type,conment,status) VALUES(?,?,?,?,?)`;
        await new Promise((resolve, reject) => {
          db.query(
            sql,
            [sendId, receiveId, type, insertData.conment, 0],
            (err, rows) => {
              if (err) return console.log(err.message);
              if (rows.affectedRows !== 0) {
                resolve({
                  code: 200,
                  message: "插入成功",
                  data: null,
                });
              }
            }
          );
        });
        socket.to(receiveId).emit("receive_notify", insertData);
      }
      if (type == 2) {
        const user = await new Promise((resolve, reject) => {
          const sql = `SELECT * FROM user where id=?`;
          db.query(sql, [sendId], (err, rows) => {
            if (err) return console.log(err.message);
            resolve(rows[0]);
          });
        });
        insertData = {
          sendId,
          username: user.username,
          receiveId,
          type,
          status: 0,
          conment,
        };
        const sql = `insert into notification(sendId, receiveId, type,conment,status) VALUES(?,?,?,?,?)`;
        await new Promise((resolve, reject) => {
          db.query(
            sql,
            [sendId, receiveId, type, insertData.conment, insertData.status],
            (err, rows) => {
              if (err) return console.log(err.message);
              if (rows.affectedRows !== 0) {
                resolve({
                  code: 200,
                  message: "插入成功",
                  data: null,
                });
              }
            }
          );
        });
        socket.to(receiveId).emit("receive_notify", insertData);
      }
      if (type == 3) {
        const user = await new Promise((resolve, reject) => {
          const sql = `SELECT * FROM user where id=?`;
          db.query(sql, [receiveId], (err, rows) => {
            if (err) return console.log(err.message);
            resolve(rows[0]);
          });
        });
        const request = await new Promise((resolve, reject) => {
          const sql = `SELECT * FROM request where sendId=? and receiveId=? order by updatedAt desc`;
          db.query(sql, [sendId, receiveId], (err, rows) => {
            if (err) return console.log(err.message);
            resolve(rows[0]);
          });
        });
        // 1. 系统通知 2. 好友申请通知 3.处理好友申请
        let message = "";
        if (request.status == 1) {
          message = user.username + "拒绝了您的申请";
        }
        if (request.status == 2) {
          message = user.username + "同意了您的申请";
        }
        // 处理请求的现在要成为sendId
        // 接受请求的人现在应该要成为receiveId
        let sendId1 = receiveId;
        let receiveId1 = sendId;
        insertData = {
          sendId: receiveId1,
          username: user.username,
          receiveId: sendId1,
          type,
          conment: message,
          status: 0,
        };
        const sql = `insert into notification(sendId, receiveId, type,conment,status) VALUES(?,?,?,?,?)`;
        await new Promise((resolve, reject) => {
          db.query(
            sql,
            [sendId1, receiveId1, type, insertData.conment, 0],
            (err, rows) => {
              if (err) return console.log(err.message);
              if (rows.affectedRows !== 0) {
                resolve({
                  code: 200,
                  message: "插入成功",
                  data: null,
                });
              }
            }
          );
        });
        socket.to(sendId).emit("receive_notify", insertData);
      }
    });
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
          io.to(item.id).emit("friend_logout", {
            msg: `您的好友-${username}-下线啦`,
          });
        });
      }
      socket.leave(id); // 将某个房间的特定的连接的websocket对象断开
    });
    socket.on("disconnect", () => {
      console.log(`socket:${socket.id} -- client disconnected`);
      // 处理客户端断开连接后的逻辑
    });
    socket.on("error", (error) => {
      console.error("A server-side error occurred:", error);
      // 处理服务器端错误逻辑
    });
  });
}
