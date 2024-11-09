/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-11-03 21:43:58
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-09 11:18:36
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\socket\chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import db from "../db/index.js";
export function sendSingleChat(socket, io) {
  socket.on("send_single_chat", async (data) => {
    // 回应者的userId,以及回应者的sdp
    const { roomId, sendId, conment, receiveId, type, updatedAt } = data;
    const sql = `insert into single_chat(roomId,conment,sendId, receiveId,type) VALUES(?,?,?,?,?)`;
    //    插入聊天记录
    await new Promise((resolve, reject) => {
      db.query(sql, [roomId, conment, sendId, receiveId, type], (err, rows) => {
        if (err) return console.log(err.message);
        resolve();
      });
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
      updatedAt,
      type,
      msg: `有信息请您注意查收`,
    };
    const sockets = [...io.sockets.sockets.values()];
    const filterSocket = sockets.find((socket) => socket.userId == receiveId);
    if (filterSocket) {
      io.to(filterSocket.id).emit("single_receive", sendData);
    }
    // io.to(receiveId).emit("single_receive", sendData);
  });
}
export function sendGroupChat(socket, io) {
  socket.on("send_group_chat", async (data) => {
    const {
      roomId,
      sendId,
      conment,
      sendIdUsername,
      sendIdAvatar,
      type = 1,
      updatedAt,
      isChat = true,
      deleteId,
      addUser = false,
    } = data;
    if (isChat) {
      const sql = `insert into group_chat(roomId,sendId,conment,type) VALUES(?,?,?,?)`;
      await new Promise((resolve, reject) => {
        db.query(sql, [roomId, sendId, conment, type], (err, rows) => {
          if (err) return console.log(err.message);
          resolve();
        });
      });
    }
    const selectSql = `select *  from group_room_user where roomId=?`;
    const sqlData = await new Promise((resolve, reject) => {
      db.query(selectSql, [roomId], (err, rows) => {
        if (err) return console.log(err.message);
        resolve(rows);
      });
    });
    sqlData.forEach((row) => {
      if (row.joinId !== sendId) {
        const result = {
          ...row,
          conment,
          type,
          sendId,
          sendIdAvatar,
          sendIdUsername,
          updatedAt,
        };
        if (deleteId) {
          result.deleteId = deleteId;
        }
        if (addUser) {
          result.joinId = sendId;
          result.addUser = addUser;
          result.avatar = sendIdAvatar;
          result.username = sendIdUsername;
          result.identity = 3;
        }
        const sockets = [...io.sockets.sockets.values()];
        const filterSocket = sockets.find(
          (socket) => socket.userId == row.joinId
        );
        if (filterSocket) {
          io.to(filterSocket.id).emit("group_receive", result);
        }
        // io.to(row.joinId).emit("group_receive", result);
      }
    });
  });
}
