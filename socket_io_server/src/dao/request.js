import db from "../db/index.js";
import { httpCode } from "../config/constraint.js";
import { getUuid } from "../utils/random/index.js";
export const getFriendRequestFn = async function (params) {
  const { id } = params;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM request where sendId=? or receiveId =?`,
      [id, id],
      (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.length > 0) {
          resolve(rows);
        }
      }
    );
  });
  for await (let data of sqlData) {
    //如果当前请求的用户是申请者，则信息列表应该返回接收者的头像和昵称
    //如果当前请求的用户不是申请者，则信息列表应该返回申请者的头像和昵称
    const selectId = data.sendId == id ? data.receiveId : data.sendId;
    //返回是不是当前用户发出好友邀请的， 1是 2不是
    data.userType = data.sendId == id ? 1 : 2;
    await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user where id=?`, [selectId], (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.length > 0) {
          data.avatar = rows[0].avatar;
          data.username = rows[0].username;
        }
        resolve();
      });
    });
  }
  const result = {
    code: 200,
    message: "查询请求列表成功",
    data: sqlData.reverse(),
    g: Date.now(),
  };
  return result;
};
export const handleFriendRequestFn = async function (params) {
  const { id, status, receiveId, sendId, conment } = params;
  const roomId = getUuid() + Date.now();
  let message = status == 1 ? "您已拒绝添加该好友" : "添加改好友成功";
  const sql = `update request set status=? where id=?`;
  await new Promise((resolve, reject) => {
    db.query(sql, [status, id], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.affectedRows > 0) {
        resolve({
          code: 200,
        });
      }
    });
  });
  const insertFriendSql1 = `insert into friend(sendId, receiveId,status,roomId) VALUES(?,?,?,?)`;
  const insertFriendSql2 = `insert into friend(sendId, receiveId,status,roomId) VALUES(?,?,?,?)`;
  const SqlData1 = await new Promise((resolve, reject) => {
    db.query(
      insertFriendSql1,
      [sendId, receiveId, status, roomId],
      (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.affectedRows !== 0) {
          resolve({
            code: 200,
            message: "插入成功",
            data: null,
            g: Date.now(),
          });
        } else {
          resolve({
            code: 424,
            message: httpCode[424],
            data: null,
            g: Date.now(),
          });
        }
      }
    );
  });
  if (SqlData1.code !== 200) {
    return SqlData1;
  }
  const SqlData2 = await new Promise((resolve, reject) => {
    db.query(
      insertFriendSql2,
      [receiveId, sendId, status, roomId],
      (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.affectedRows !== 0) {
          resolve({
            code: 200,
            message: "插入成功",
            data: null,
            g: Date.now(),
          });
        } else {
          resolve({
            code: 424,
            message: httpCode[424],
            data: null,
            g: Date.now(),
          });
        }
      }
    );
  });
  if (SqlData2.code !== 200) {
    return SqlData2;
  }
  // const sql2 = `update friend set status=? , roomId=?  where sendId=?`;
  // await new Promise((resolve, reject) => {
  //   db.query(sql2, [status, roomId, receiveId], (err, rows) => {
  //     if (err) return console.log(err.message);
  //     if (rows.affectedRows > 0) {
  //       resolve({
  //         code: 200,
  //       });
  //     }
  //   });
  // });
  // const sql3 = `update friend set status=? , roomId=? where receiveId=?`;
  // await new Promise((resolve, reject) => {
  //   db.query(sql3, [status, roomId, receiveId], (err, rows) => {
  //     if (err) return console.log(err.message);
  //     if (rows.affectedRows > 0) {
  //       resolve({
  //         code: 200,
  //       });
  //     }
  //   });
  // });
  // 如果是同意好友申请，就需要立即添加消息记录到房间
  if (status == 2) {
    //   type 默认为1，表示普通信息聊天
    const sql4 = `insert into single_chat(roomId,conment,sendId, receiveId,type) VALUES(?,?,?,?,?)`;

    await new Promise((resolve, reject) => {
      db.query(sql4, [roomId, conment, sendId, receiveId, 1], (err, rows) => {
        if (err) return console.log(err.message);
        resolve();
      });
    });
  }

  const result = {
    code: 200,
    message: message,
    data: null,
    g: Date.now(),
  };
  return result;
};
