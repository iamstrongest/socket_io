/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 11:19:08
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-27 15:19:42
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_server\src\dao\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import db from "../db/index.js";
import { httpCode } from "../config/constraint.js";
import jwt from "../utils/token/index.js";
import { getUuid } from "../utils/random/index.js";
/**
 *
 * @param {*} params { email:string , username:string , password:string,avatar:string}
 * @returns
 */
export const registFn = async function (params) {
  const { username, email, password, avatar } = params;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(`SELECT * FROM user where email=?`, [email], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 420,
          message: httpCode[420],
          data: null,
          g: Date.now(),
        });
      } else {
        resolve({
          code: 200,
          message: "用户可进行注册",
          data: null,
          g: Date.now(),
        });
      }
    });
  });
  if (sqlData.code === 420) {
    return sqlData;
  } else {
    const uuid = getUuid();
    const sql = `insert into user(username, email, password,avatar,uuid) VALUES(?,?,?,?,?)`;
    const data = await new Promise((resolve, reject) => {
      db.query(sql, [username, email, password, avatar, uuid], (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.affectedRows !== 0) {
          resolve({
            code: 200,
            message: "注册成功",
            data: null,
            g: Date.now(),
          });
        }
      });
    });
    return data;
  }
};
export const loginFn = async function (params) {
  const { email, password } = params;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM user where email=? and password=?`,
      [email, password],
      (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.length > 0) {
          const { email, id } = rows[0];
          const tokenParams = { email, id };
          resolve({
            code: 200,
            message: "登录成功",
            data: {
              token: jwt.createToken(tokenParams),
            },
            g: Date.now(),
          });
        } else {
          resolve({
            code: 418,
            message: httpCode[418],
            data: null,
            g: Date.now(),
          });
        }
      }
    );
  });

  if (sqlData.code === 200) {
    const uuid = getUuid();
    const sql = `update user set uuid=? where email=?`;
    await new Promise((resolve, reject) => {
      db.query(sql, [uuid, email], (err, rows) => {
        if (err) return console.log(err.message);
        resolve();
      });
    });
  }

  return sqlData;
};
export const getUserFn = async function (params) {
  const { id } = params;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(`SELECT * FROM user where id=?`, [id], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        const result = rows[0];
        delete result.password;
        delete result.createdAt;
        delete result.updatedAt;
        resolve({
          code: 200,
          message: "查找用户成功",
          data: result,
          g: Date.now(),
        });
      } else {
        resolve({
          code: 419,
          message: httpCode[419],
          data: null,
          g: Date.now(),
        });
      }
    });
  });
  return sqlData;
};
export const addFriendFn = async function (params) {
  const { sendId, conment, receiveId } = params;
  // 先判断是否添加的是自己
  if (sendId === receiveId) {
    const data = {
      code: 422,
      message: httpCode[422],
      data: null,
      g: Date.now(),
    };
    return data;
  }
  // 再判断添加的账号是否存在
  const hasReceiver = await new Promise((resolve, reject) => {
    const sql = `SELECT * FROM user where id=?`;
    const cases = [receiveId, receiveId];
    db.query(sql, cases, (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
  if (!hasReceiver) {
    const data = {
      code: 423,
      message: httpCode[423],
      data: null,
      g: Date.now(),
    };
    return data;
  }
  // 查看当前是不是好友关系
  const sqlData = await new Promise((resolve, reject) => {
    const sql = `SELECT * FROM friend where ((sendId=? and receiveId=?)or(sendId=? and receiveId=?))  and status=?`;
    const cases = [sendId, receiveId, receiveId, sendId, 2];
    db.query(sql, cases, (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 421,
          message: httpCode[421],
          data: null,
          g: Date.now(),
        });
      } else {
        resolve({
          code: 200,
          message: "可以添加好友",
          data: null,
          g: Date.now(),
        });
      }
    });
  });
  if (sqlData.code == 421) {
    return sqlData;
  }
  // 查看申请列表存不存在添加信息
  const sqlRequestData = await new Promise((resolve, reject) => {
    const sql = `SELECT * FROM request where  ((sendId=? and receiveId=?)or(sendId=? and receiveId=?)) and status=?`;
    const cases = [sendId, receiveId, receiveId, sendId, 0];
    db.query(sql, cases, (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 426,
          message: httpCode[426],
          data: null,
          g: Date.now(),
        });
      } else {
        resolve({
          code: 200,
          message: "可以添加好友",
          data: null,
          g: Date.now(),
        });
      }
    });
  });
  if (sqlRequestData.code == 426) {
    return sqlRequestData;
  }
  const insertRequestSql = `insert into request(sendId, conment, receiveId) VALUES(?,?,?)`;
  const successData = await new Promise((resolve, reject) => {
    db.query(insertRequestSql, [sendId, conment, receiveId], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.affectedRows !== 0) {
        resolve({
          code: 200,
          message: "好友申请发送成功，等待对方进行验证",
          data: null,
          g: Date.now(),
        });
      } else {
        resolve({
          code: 425,
          message: httpCode[425],
          data: null,
          g: Date.now(),
        });
      }
    });
  });
  return successData;
};

export const getFriendFn = async function (params) {
  const { id } = params;
  const sql = `SELECT * FROM friend where sendId=? and status=?`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [id, 2], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 200,
          message: "好友列表请求成功",
          data: rows,
          length: rows.length,
          g: Date.now(),
        });
      } else {
        resolve({
          code: 200,
          message: "暂无好友列表",
          data: [],
          length: 0,
          g: Date.now(),
        });
      }
    });
  });
  if (sqlData.length === 0) {
    delete sqlData.length;
    return sqlData;
  }
  const data = [];

  for await (let item of sqlData.data) {
    await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user where id=?`,
        [item.receiveId],
        (err, rows) => {
          if (err) return console.log(err.message);
          if (rows.length > 0) {
            const userinfo = {};
            userinfo.avatar = rows[0].avatar;
            userinfo.username = rows[0].username;
            userinfo.id = rows[0].id;
            userinfo.email = rows[0].email;
            userinfo.roomId = item.roomId;
            data.push(userinfo);
          }
          resolve();
        }
      );
    });
  }
  const result = {
    code: 200,
    message: "好友列表请求成功",
    data: data,
    g: Date.now(),
  };
  return result;
};
export const getUserDetailFn = async function (params) {
  const { id } = params;
  const sql = `SELECT * FROM user where id=?`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [id], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        const data = rows[0];
        delete data.password;
        resolve({
          code: 200,
          message: "用户详情查询成功",
          data: data,
          g: Date.now(),
        });
      } else {
        resolve({
          code: 419,
          message: httpCode[419],
          data: null,
          g: Date.now(),
        });
      }
    });
  });
  return sqlData;
};
export const getAllUserDetailFn = async function () {
  const sql = `SELECT * FROM user`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 200,
          message: "用户详情查询成功",
          data: rows,
          g: Date.now(),
        });
      }
    });
  });
  sqlData.data.forEach((user) => {
    delete user.password;
  });
  return sqlData;
};
export const updateAvatarFn = async function (params) {
  const { id, avatar } = params;
  console.log(id, avatar);

  const sql = `update user set avatar=? where id=?`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [avatar, id], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.affectedRows > 0) {
        resolve({
          code: 200,
          message: "修改头像成功",
          data: null,
          g: Date.now(),
        });
      }
    });
  });
  return sqlData;
};
export const updateUserinfoFn = async function (params) {
  const { username, theme, description, id } = params;
  const sql = `update user set username=?, theme=?, description=? where id=?`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [username, theme, description, id], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.affectedRows > 0) {
        resolve({
          code: 200,
          message: "修改资料成功",
          data: null,
          g: Date.now(),
        });
      }
    });
  });
  return sqlData;
};
