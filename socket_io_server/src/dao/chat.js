import db from "../db/index.js";
import { httpCode, chatRoomType } from "../config/constraint.js";
export const getChatFn = async function (params) {
  let { roomId, page } = params;
  console.log(roomId, page);

  const sort = "desc"; //desc降序 asc升序
  const limit = 10;
  const sql = `SELECT * FROM single_chat where roomId=? order by updatedAt ${sort}`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [roomId], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 200,
          message: "查找聊天成功",
          data: rows,
          g: Date.now(),
        });
      } else {
        resolve({
          code: 200,
          message: "没有更多聊天信息了",
          data: [],
          g: Date.now(),
        });
      }
    });
  });
  for await (let item of sqlData.data) {
    await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user where id=?`, [item.sendId], (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.length > 0) {
          item.sendIdAvatar = rows[0].avatar;
          item.sendIdUsername = rows[0].username;
        }
        resolve();
      });
    });
    await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user where id=?`,
        [item.receiveId],
        (err, rows) => {
          if (err) return console.log(err.message);
          if (rows.length > 0) {
            item.receiveIdAvatar = rows[0].avatar;
            item.receiveIdUsername = rows[0].username;
          }
          resolve();
        }
      );
    });
  }
  sqlData.totalPage = parseInt(sqlData.data.length / limit);
  if (sqlData.data.length % limit > 0) {
    sqlData.totalPage = sqlData.totalPage + 1;
  }
  const data = sqlData.data.slice(limit * (page - 1), limit * page);
  if (data.length === 0) {
    sqlData.message = "没有更多聊天信息了";
  }
  sqlData.data = data.reverse();
  return sqlData;
};
export const getRoomFn = async function (params) {
  const { id } = params;
  const sort = "desc"; //desc降序 asc升序
  const limit = 10;
  const sql = `SELECT * FROM single_chat where sendId=? or receiveId=? order by updatedAt ${sort}`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [id, id], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 200,
          data: rows,
          length: rows.length,
        });
      } else {
        resolve({
          code: 200,
          message: "暂无聊天记录",
          length: 0,
          data: [],
          g: Date.now(),
        });
      }
    });
  });

  if (sqlData.length === 0) {
    return sqlData;
  }
  const data = [];
  sqlData.data.forEach((dataItem) => {
    if (!data.some((item) => dataItem?.roomId === item.roomId)) {
      data.push(dataItem);
    }
  });
  for await (let item of data) {
    const searchId = id == item.sendId ? item.receiveId : item.sendId;
    await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user where id=?`, [searchId], (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.length > 0) {
          item.avatar = rows[0].avatar;
          item.username = rows[0].username;
          item.showUserId = rows[0].id;
          item.email = rows[0].email;
          item.chatRoomType = chatRoomType["1"]; //私聊
        }
        resolve();
      });
    });
  }
  const result = {
    code: 200,
    message: "查找聊天会话房间成功",
    length: 0,
    data: data,
    g: Date.now(),
  };
  return result;
};
