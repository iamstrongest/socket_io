/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-30 22:52:18
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-04 13:51:17
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\dao\group_chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { generateSixDigitNumber } from "../utils/random/index.js";
import { httpCode, chatRoomType } from "../config/constraint.js";
import db from "../db/index.js";
// 获取群聊用户对话
export const getGroupChatFn = async function (params) {
  let { roomId, page } = params;
  const sort = "desc"; //desc降序 asc升序
  const limit = 10;
  const sql = `SELECT * FROM group_chat where roomId=? order by updatedAt ${sort}`;
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
          item.chatRoomType = chatRoomType["2"]; //群聊
        }
        resolve();
      });
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
// 获取群聊用户权限
export const getGroupUserIdentityFn = async function (params) {
  let { roomId, joinId } = params;
  const selectUsersql = `select * from group_room_user where roomId=? and joinId=?`;
  const result = await new Promise((resolve, reject) => {
    db.query(selectUsersql, [roomId, joinId], (err, rows) => {
      if (err) return console.log(err.message);
      resolve({
        code: 200,
        message: "查找用群用户权限成功",
        data: rows[0],
        g: Date.now(),
      });
    });
  });
  return result;
};
// 获取目前群聊房间信息
export const getGroupRoomFn = async function (params) {
  const { roomId } = params;
  const sql = `SELECT * FROM group_room where roomId=?`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [roomId], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 200,
          message: "查找房间成功",
          data: rows[0],
          g: Date.now(),
        });
      } else {
        resolve({
          code: 429,
          message: httpCode[429],
          data: null,
          g: Date.now(),
        });
      }
    });
  });
  return sqlData;
};
// 获取目前群聊房间用户信息
export const getGroupRoomUserFn = async function (params) {
  const { roomId } = params;
  const selectUsersql = `select * from group_room_user where roomId=?`;
  const selectResult = await new Promise((resolve, reject) => {
    db.query(selectUsersql, [roomId], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 200,
          data: rows,
        });
      }
      resolve({
        code: 430,
        message: httpCode[430],
        data: null,
        g: Date.now(),
      });
    });
  });
  if (selectResult.code === 430) {
    return selectResult;
  }

  for await (const item of selectResult.data) {
    const sql = `select *  from user where id=?`;
    await new Promise((resolve, reject) => {
      db.query(sql, [item.joinId], (err, rows) => {
        if (err) return console.log(err.message);
        item.avatar = rows[0].avatar;
        item.username = rows[0].username;
        resolve();
      });
    });
  }
  const leader = selectResult.data.filter((item) => item.identity === 1);
  const manager = selectResult.data.filter((item) => item.identity === 2);
  const common = selectResult.data.filter((item) => item.identity === 3);
  const result = {
    code: 200,
    message: "查找用户列表成功",
    data: [...leader, ...manager, ...common],
    g: Date.now(),
  };
  return result;
};
// 获取群聊房间并且拿到最后一次会话信息
export const getGroupRoomLastChatListFn = async function (params) {
  const { id } = params;
  const sort = "desc"; //desc降序 asc升序
  const limit = 10;
  const sql_group_room_user = `SELECT * FROM group_room_user where joinId=?`;
  const sql_group_room_user_Data = await new Promise((resolve, reject) => {
    db.query(sql_group_room_user, [id], (err, rows) => {
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
          message: "暂无群聊天记录",
          length: 0,
          data: [],
          g: Date.now(),
        });
      }
    });
  });
  if (sql_group_room_user_Data.length === 0) {
    return sql_group_room_user_Data;
  }
  let group_room_chat_data = [];
  for await (const item of sql_group_room_user_Data.data) {
    const sql = `select *  from group_chat where roomId=? order by updatedAt ${sort}`;
    const resultData = await new Promise((resolve, reject) => {
      db.query(sql, [item.roomId], (err, rows) => {
        if (err) return console.log(err.message);
        resolve(rows[0]);
      });
    });
    group_room_chat_data.push(resultData);
  }
  for await (const item of group_room_chat_data) {
    const sql = `select *  from group_room where roomId=?`;
    await new Promise((resolve, reject) => {
      db.query(sql, [item.roomId], (err, rows) => {
        if (err) return console.log(err.message);
        item.avatar = rows[0].avatar;
        item.roomName = rows[0].roomName;
        item.chatRoomType = chatRoomType["2"]; //群聊
        resolve();
      });
    });
  }
  const result = {
    code: 200,
    message: "查找聊天群聊会话房间成功",
    length: 0,
    data: group_room_chat_data,
    g: Date.now(),
  };
  return result;
};
// 获取群聊房间
export const getGroupRoomListFn = async function (params) {
  const { joinId } = params;
  const sort = "desc"; //desc降序 asc升序
  const limit = 10;
  const sql = `SELECT * FROM group_room_user where joinId=? order by updatedAt ${sort}`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [joinId], (err, rows) => {
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
          message: "暂无加入群聊",
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
  for await (const item of sqlData.data) {
    const sql = `select *  from group_room where roomId=?`;
    await new Promise((resolve, reject) => {
      db.query(sql, [item.roomId], (err, rows) => {
        if (err) return console.log(err.message);
        item.avatar = rows[0].avatar;
        item.roomName = rows[0].roomName;
        resolve();
      });
    });
  }
  delete sqlData.length;
  sqlData.message = "查找群聊成功";
  sqlData.g = Date.now();
  return sqlData;
};
// 创建群聊
export const createGroupRoomFn = async function (params) {
  const { roomName, avatar } = params;
  // 创建12位数的群聊房间号
  const roomId = generateSixDigitNumber() + String(Date.now()).slice(7);
  const sql = `insert into group_room(roomId,roomName,avatar ) VALUES(?,?,?)`;
  const result = await new Promise((resolve, reject) => {
    db.query(sql, [roomId, roomName, avatar], (err, rows) => {
      if (err) return console.log(err.message);
      resolve({
        code: 200,
        message: `创建${roomName}群成功,群号${roomId}`,
        data: {
          roomId,
          roomName,
        },
        g: Date.now(),
      });
    });
  });
  return result;
};
// 房主或者管理员直接邀请用户插入群聊，不需要经过申请
export const insertGroupRoomUserFn = async function (params) {
  const { roomId, joinId, identity } = params;
  const selectUsersql = `select * from group_room_user where roomId=?  and joinId=?`;
  const selectResult = await new Promise((resolve, reject) => {
    db.query(selectUsersql, [roomId, joinId], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 428,
          message: httpCode[428],
          data: null,
          g: Date.now(),
        });
      }
      resolve({
        code: 200,
      });
    });
  });
  if (selectResult.code !== 200) {
    return selectResult;
  }
  const sql = `insert into group_room_user(roomId,joinId ,identity) VALUES(?,?,?)`;
  const result = await new Promise((resolve, reject) => {
    db.query(sql, [roomId, joinId, identity], (err, rows) => {
      if (err) return console.log(err.message);
      resolve({
        code: 200,
        message: "加入群聊成功",
        data: null,
        g: Date.now(),
      });
    });
  });
  return result;
};
// 用户主动申请加入群聊，需要经过申请
export const insertGroupRequestFn = async function (params) {
  const { roomId, joinId, conment, status = 1 } = params;
  const selectUsersql1 = `select * from group_room_user where roomId=?  and joinId=?`;
  const selectResult1 = await new Promise((resolve, reject) => {
    db.query(selectUsersql1, [roomId, joinId], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 428,
          message: httpCode[428],
          data: null,
          g: Date.now(),
        });
      }
      resolve({
        code: 200,
      });
    });
  });
  if (selectResult1.code !== 200) {
    return selectResult1;
  }
  const selectUsersql2 = `select * from group_request where roomId=?  and joinId=? and status=1`;
  const selectResult2 = await new Promise((resolve, reject) => {
    db.query(selectUsersql2, [roomId, joinId], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 431,
          message: httpCode[431],
          data: null,
          g: Date.now(),
        });
      }
      resolve({
        code: 200,
      });
    });
  });
  if (selectResult2.code !== 200) {
    return selectResult2;
  }
  const sql = `insert into group_request(roomId,joinId ,conment,status) VALUES(?,?,?,?)`;
  const result = await new Promise((resolve, reject) => {
    db.query(sql, [roomId, joinId, conment, status], (err, rows) => {
      if (err) return console.log(err.message);
      resolve({
        code: 200,
        message: "申请加入群聊成功",
        data: null,
        g: Date.now(),
      });
    });
  });
  return result;
};
// 获取群聊申请列表
export const getGroupRequestListFn = async function (params) {
  const { joinId } = params;
  const sort = "desc"; //desc降序 asc升序
  const limit = 10;
  // 获取申请列表
  const sql1 = `SELECT * FROM group_request where joinId=? order by updatedAt ${sort}`;
  const sqlData1 = await new Promise((resolve, reject) => {
    db.query(sql1, [joinId], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve(rows);
      } else {
        resolve([]);
      }
    });
  });
  // 管理员和房主要处理的申请列表
  const sql2 = `SELECT * FROM group_room_user where joinId=? and (identity=1 or identity=2)`;
  const sqlData2 = await new Promise((resolve, reject) => {
    db.query(sql2, [joinId], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve(rows);
      } else {
        resolve([]);
      }
    });
  });
  const data = [];
  data.push(...sqlData1);
  for await (const room of sqlData2) {
    // 处理申请群聊请求
    const sql1 = `SELECT * FROM group_request where roomId=? order by updatedAt ${sort}`;
    const result = await new Promise((resolve, reject) => {
      db.query(sql1, [room.roomId], (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.length > 0) {
          rows.forEach((row) => {
            row.canHandle = 1;
          });
          resolve(rows);
        } else {
          resolve([]);
        }
      });
    });
    data.push(...result);
  }
  // 重新排序
  data.sort(function (a, b) {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
  let filterId = 1;
  for await (const item of data) {
    // 处理申请群聊请求
    const sql = `SELECT * FROM user where id=?`;
    await new Promise((resolve, reject) => {
      db.query(sql, [item.joinId], (err, rows) => {
        if (err) return console.log(err.message);
        item.avatar = rows[0].avatar;
        resolve();
      });
    });
    const sql2 = `SELECT * FROM group_room where roomId=?`;
    await new Promise((resolve, reject) => {
      db.query(sql2, [item.roomId], (err, rows) => {
        if (err) return console.log(err.message);
        item.roomName = rows[0].roomName;
        resolve();
      });
    });
    if (item.handleId) {
      await new Promise((resolve, reject) => {
        db.query(sql, [item.handleId], (err, rows) => {
          if (err) return console.log(err.message);
          item.handleUsername = rows[0].username;
          resolve();
        });
      });
    }
    item.filterId = filterId;
    filterId++;
  }
  filterId = null;
  const result = {
    code: 200,
    message: "查找群聊申请列表",
    data: data,
    g: Date.now(),
  };
  return result;
};
// 处理群聊申请用户
export const updateGroupRequestFn = async function (params) {
  const { roomId, joinId, handleId, status, conment } = params;
  const sql = `update group_request set status=?,handleId=? where roomId=? and joinId=?`;
  const result = await new Promise((resolve, reject) => {
    db.query(sql, [status, handleId, roomId, joinId], (err, rows) => {
      if (err) return console.log(err.message);
      resolve({
        code: 200,
        message: "处理成功",
        data: null,
        g: Date.now(),
      });
    });
  });
  if (status == 2) {
    //如果同意，就插入到群聊用户表中以及群聊会话记录表中
    const identity = 3; //默认普通用户权限
    const sql = `insert into group_room_user(roomId,joinId ,identity) VALUES(?,?,?)`;
    await new Promise((resolve, reject) => {
      db.query(sql, [roomId, joinId, identity], (err, rows) => {
        if (err) return console.log(err.message);
        resolve();
      });
    });
  }
  const sql2 = `insert into group_chat(roomId,sendId,conment ) VALUES(?,?,?)`;
  await new Promise((resolve, reject) => {
    db.query(sql2, [roomId, joinId, conment], (err, rows) => {
      if (err) return console.log(err.message);
      resolve();
    });
  });
  return result;
};
// 群聊插入对话
export const insertGroupChatFn = async function (params) {
  const { roomId, sendId, conment } = params;
  const sql = `insert into group_chat(roomId,sendId,conment ) VALUES(?,?,?)`;
  const result = await new Promise((resolve, reject) => {
    db.query(sql, [roomId, sendId, conment], (err, rows) => {
      if (err) return console.log(err.message);
      resolve({
        code: 200,
        message: "插入成功",
        data: null,
        g: Date.now(),
      });
    });
  });
  return result;
};
// 更改群聊用户管理权限
export const updateGroupUserIdentityFn = async function (params) {
  let { roomId, joinId, identity, handleId } = params;
  // 先查询处理人有无权限
  const selectUserIdentysql = `select * from group_room_user where roomId=? and joinId=?`;
  const resultIdenty = await new Promise((resolve, reject) => {
    db.query(selectUserIdentysql, [roomId, handleId], (err, rows) => {
      if (err) return console.log(err.message);
      resolve(rows[0]);
    });
  });
  if (
    resultIdenty.identity === 1 || //处理人是房主
    resultIdenty.identity === 2 //处理人是管理员
  ) {
    const selectUsersql = `update group_room_user set identity=? where roomId=? and joinId=?`;
    const result = await new Promise((resolve, reject) => {
      db.query(selectUsersql, [identity, roomId, joinId], (err, rows) => {
        if (err) return console.log(err.message);
        resolve({
          code: 200,
          message: "更改用群用户权限成功",
          data: null,
          g: Date.now(),
        });
      });
    });
    return result;
  } else {
    return {
      code: 432,
      message: httpCode[432],
      data: null,
      g: Date.now(),
    };
  }
};
// 自己退出群聊，或者房主/管理员删除群聊用户
export const deleteGroupUserFn = async function (params) {
  let { roomId, joinId, handleId } = params;
  const selectUserIdentysql = `select * from group_room_user where roomId=? and joinId=?`;
  const resultIdenty = await new Promise((resolve, reject) => {
    db.query(selectUserIdentysql, [roomId, handleId], (err, rows) => {
      if (err) return console.log(err.message);
      resolve(rows[0]);
    });
  });
  let conment;
  const selectJoinUsersql = "select * from user where id=?";
  const selectJoinUserData = await new Promise((resolve, reject) => {
    db.query(selectJoinUsersql, [joinId], (err, rows) => {
      if (err) return console.log(err.message);
      resolve(rows[0]);
    });
  });
  const selectHandleUsersql = "select * from user where id=?";
  const selectHandleUserData = await new Promise((resolve, reject) => {
    db.query(selectHandleUsersql, [handleId], (err, rows) => {
      if (err) return console.log(err.message);
      resolve(rows[0]);
    });
  });
  if (joinId != handleId) {
    conment = `${selectHandleUserData.username}将${selectJoinUserData.username}移除了群聊`;
  } else {
    conment = `${selectJoinUserData.username}退出了群聊`;
  }

  if (
    handleId == joinId || //处理人是自己
    resultIdenty.identity === 1 || //处理人是房主
    resultIdenty.identity === 2 //处理人是管理员
  ) {
    const deleteSql = `delete from  group_room_user  where roomId=? and joinId=?`;
    await new Promise((resolve, reject) => {
      db.query(deleteSql, [roomId, joinId], (err, rows) => {
        if (err) return console.log(err.message);
        resolve();
      });
    });
    //删除后，新增信息到群聊,如果是被移除，则发送人是群主或者管理员，否者是当前主动退出群聊的人
    const sql = `insert into group_chat(roomId,sendId,conment ) VALUES(?,?,?)`;
    await new Promise((resolve, reject) => {
      db.query(
        sql,
        [roomId, joinId != handleId ? handleId : joinId, conment],
        (err, rows) => {
          if (err) return console.log(err.message);
          resolve();
        }
      );
    });
    return {
      code: 200,
      message: "退出群聊成功",
      data: null,
      g: Date.now(),
    };
  }

  return {
    code: 433,
    message: httpCode[433],
    data: null,
    g: Date.now(),
  };
};
