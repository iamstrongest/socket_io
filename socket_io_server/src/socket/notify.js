import db from "../db/index.js";
export function sendNotify(socket, io) {
  socket.on("send_notify", async (data) => {
    // 1. 系统通知 2. 好友申请通知 3.处理好友申请 4.群聊申请通知 5.处理群聊申请
    const { sendId, receiveId, conment, roomId } = data;
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
      const sockets = [...io.sockets.sockets.values()];
      const filterSocket = sockets.find((socket) => socket.userId == receiveId);
      if (filterSocket) {
        io.to(filterSocket.id).emit("receive_notify", insertData);
      }
      // socket.to(receiveId).emit("receive_notify", insertData);
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
      const sockets = [...io.sockets.sockets.values()];
      const filterSocket = sockets.find((socket) => socket.userId == receiveId);
      if (filterSocket) {
        io.to(filterSocket.id).emit("receive_notify", insertData);
      }
      // socket.to(receiveId).emit("receive_notify", insertData);
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
      const sockets = [...io.sockets.sockets.values()];
      const filterSocket = sockets.find((socket) => socket.userId == sendId);
      if (filterSocket) {
        io.to(filterSocket.id).emit("receive_notify", insertData);
      }
      // socket.to(sendId).emit("receive_notify", insertData);
    }
    if (type == 4) {
      //通知管理员或者房主
      const sqlData = await new Promise((resolve, reject) => {
        const sql = `SELECT * FROM group_room_user where roomId=? and identity=1 or identity=2`;
        db.query(sql, [roomId], (err, rows) => {
          if (err) return console.log(err.message);
          resolve(rows);
        });
      });
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
        type,
        status: 0,
        conment,
      };
      // receiveId -1 群聊申请，不需要有人接收
      const sql = `insert into notification(sendId, receiveId, type,conment,status) VALUES(?,?,?,?,?)`;
      await new Promise((resolve, reject) => {
        db.query(
          sql,
          [sendId, -1, type, insertData.conment, insertData.status],
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
      sqlData.forEach((item) => {
        const sockets = [...io.sockets.sockets.values()];
        const filterSocket = sockets.find(
          (socket) => socket.userId == item.joinId
        );
        if (filterSocket) {
          io.to(filterSocket.id).emit("receive_notify", insertData);
        }
        // socket.to(item.joinId).emit("receive_notify", insertData);
      });
    }
    if (type == 5) {
      const user = await new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user where id=?`;
        db.query(sql, [sendId], (err, rows) => {
          if (err) return console.log(err.message);
          resolve(rows[0]);
        });
      });
      const roomName = await new Promise((resolve, reject) => {
        const sql = `SELECT * FROM group_room where roomId=?`;
        db.query(sql, [roomId], (err, rows) => {
          if (err) return console.log(err.message);
          resolve(rows[0].roomName);
        });
      });
      const request = await new Promise((resolve, reject) => {
        const sql = `SELECT * FROM group_request where roomId=? sendId=? order by updatedAt desc`;
        db.query(sql, [roomId, sendId], (err, rows) => {
          if (err) return console.log(err.message);
          resolve(rows[0]);
        });
      });
      // 1. 系统通知 2. 好友申请通知 3.处理好友申请
      let message = "";
      if (request.status == 2) {
        message = user.username + `同意了您加入${roomName}群聊申请`;
      }
      if (request.status == 3) {
        message = user.username + `拒绝了您加入${roomName}群聊申请`;
      }
      insertData = {
        sendId,
        username: user.username,
        receiveId,
        type,
        conment: message,
        status: 0,
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
      const sockets = [...io.sockets.sockets.values()];
      const filterSocket = sockets.find(
        (socket) => socket.userId == ireceiveId
      );
      if (filterSocket) {
        io.to(filterSocket.id).emit("receive_notify", insertData);
      }
      // socket.to(receiveId).emit("receive_notify", insertData);
    }
  });
}
