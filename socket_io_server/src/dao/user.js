/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 11:19:08
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-24 11:22:02
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_server\src\dao\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import db from "../db/index.js";
import { httpCode } from "../config/constraint.js";
import jwt from "../utils/token/index.js";
import { getUuid } from "../utils/random/index.js";
import { canSignIN } from "../utils/index.js";
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
              refresh_token: jwt.createFreshToken(tokenParams),
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
    sqlData.data.uuid = uuid;
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
// token校验本地是否过期
export const refreshFn = async function (params) {
  const decode = { id: params.id, email: params.email };
  const token = jwt.createToken(decode);
  const refresh_token = jwt.createFreshToken(decode);
  const result = {
    code: 200,
    token,
    refresh_token,
    data: null,
    message: "刷新token验证成功",
  };
  return result;
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
export const getAttendanceFn = async function (params) {
  const { userId, attendance_year_month } = params;
  const sort = "asc"; //desc降序 asc升序
  const sql = `select * from attendance where userId=? and attendance_year_month=? order by createdAt ${sort}`;
  const data = [];
  const dateMap = {};
  await new Promise((resolve, reject) => {
    db.query(sql, [userId, attendance_year_month], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        rows.forEach((row) => {
          if (!dateMap[row.date]) {
            dateMap[row.date] = [];
          }
          dateMap[row.date].push(row.createdAt);
        });
        const offset = 8 * 60; // 中国时区偏移量，单位为分钟
        Object.keys(dateMap).forEach((key) => {
          const length = dateMap[key].length;
          const localTimeEarliest = new Date(
            dateMap[key][0].getTime() + offset * 60000
          ); // 手动加上偏移量
          const localTimeLatest = new Date(
            dateMap[key][length - 1].getTime() + offset * 60000
          ); // 手动加上偏移量
          const text =
            localTimeLatest.getTime() - localTimeEarliest.getTime() <
            1000 * 60 * 60 * 9
              ? "缺勤"
              : "√";
          data.push({
            latest: localTimeLatest,
            earliest: localTimeEarliest,
            text,
            createdAt: key,
            showAbsence:
              localTimeLatest.getTime() - localTimeEarliest.getTime() <
              1000 * 60 * 60 * 9,
          });
        });
      }
      resolve();
    });
  });
  const sqlData = {
    code: 200,
    message: "获取考勤表成功",
    data,
    g: Date.now(),
  };
  return sqlData;
};
export const getUserAttendanceFn = async function (params) {
  const { userId, attendance_year_month } = params;
  const sort = "asc"; //desc降序 asc升序
  const sql = `select * from attendance where userId=? and attendance_year_month=? order by createdAt ${sort}`;
  const dateMap = {};
  const data = [];
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [userId, attendance_year_month], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        rows.forEach((row) => {
          if (!dateMap[row.date]) {
            dateMap[row.date] = [];
          }
          dateMap[row.date].push(row.createdAt);
        });
        const offset = 8 * 60; // 中国时区偏移量，单位为分钟
        Object.keys(dateMap).forEach((key) => {
          const length = dateMap[key].length;
          const localTimeEarliest = new Date(
            dateMap[key][0].getTime() + offset * 60000
          ); // 手动加上偏移量
          const localTimeLatest = new Date(
            dateMap[key][length - 1].getTime() + offset * 60000
          ); // 手动加上偏移量
          const text =
            localTimeLatest.getTime() - localTimeEarliest.getTime() <
            1000 * 60 * 60 * 9
              ? "缺勤"
              : "√";
          data.push({
            latest: localTimeLatest,
            earliest: localTimeEarliest,
            text,
          });
        });
      }
      resolve({
        code: 200,
        message: "获取用户考勤表成功",
        data,
        g: Date.now(),
      });
    });
  });
  return sqlData;
};
export const absenceFn = async function (params) {
  const { userId, description, time } = params;
  const offset = 8 * 60; // 中国时区偏移量，单位为分钟
  const date = new Date(new Date(time) + offset * 60000);
  // 设置时间为早上 9 点
  date.setHours(9, 0, 0, 0); // 设置为 9:00:00.000
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() - 1 <= 9 ? "0" + date.getDate() : date.getDate();
  const attendance_year_month = "" + year + "-" + month;
  const attendance_date = attendance_year_month + "-" + day;
  let createdAt = date;
  let updatedAt = date;
  const sqlEarliest = `insert into attendance(userId,date,attendance_year_month,description,createdAt,updatedAt) VALUES(?,?,?,?,?,?)`;
  await new Promise((resolve, reject) => {
    db.query(
      sqlEarliest,
      [
        userId,
        attendance_date,
        attendance_year_month,
        description,
        createdAt,
        updatedAt,
      ],
      (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.affectedRows > 0) {
          resolve();
        }
      }
    );
  });
  const sqlLatest = `insert into attendance(userId,date,attendance_year_month,description,createdAt,updatedAt) VALUES(?,?,?,?,?,?)`;
  // 设置最后打卡时间为下午18 点
  date.setHours(18, 0, 0, 0); // 设置为 18:00:00.000
  createdAt = date;
  updatedAt = date;
  await new Promise((resolve, reject) => {
    db.query(
      sqlLatest,
      [
        userId,
        attendance_date,
        attendance_year_month,
        description,
        createdAt,
        updatedAt,
      ],
      (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.affectedRows > 0) {
          resolve();
        }
      }
    );
  });
  return {
    code: 200,
    message: "补卡成功",
    data: null,
    g: Date.now(),
  };
};

export const insertAttendanceFn = async function (params) {
  const { userId, userLatitude, userLongitude } = params;
  const position = { userLatitude, userLongitude };
  if (!canSignIN(position)) {
    return {
      code: 411,
      message: httpCode[411],
      data: null,
      g: Date.now(),
    };
  }
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
  const attendance_year_month = "" + year + "-" + month;
  const attendance_date = attendance_year_month + "-" + day;
  const sql = `insert into attendance(userId,date,attendance_year_month) VALUES(?,?,?)`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(
      sql,
      [userId, attendance_date, attendance_year_month],
      (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.affectedRows > 0) {
          resolve({
            code: 200,
            message: "打卡成功",
            data: null,
            g: Date.now(),
          });
        }
      }
    );
  });
  return sqlData;
};
