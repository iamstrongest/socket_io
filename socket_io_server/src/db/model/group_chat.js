/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-30 22:45:44
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-02 09:54:05
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\db\model\group_chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 创建房间表的SQL语句
const createGroupRoomTableSql = `
CREATE TABLE group_room (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增的主键',
    roomId VARCHAR(255) NOT NULL COMMENT '房间号',
    roomName VARCHAR(255) NOT NULL COMMENT '房间名称',
    avatar VARCHAR(255) COMMENT '群聊头像 URL',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间，默认当前时间',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间，默认当前时间，更新时自动更新时间'
);
`;
// 创建房间表的SQL语句
const createGroupRoomUserTableSql = `
CREATE TABLE group_room_user (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增的主键',
    roomId VARCHAR(255) NOT NULL COMMENT '房间号',
    joinId INTEGER NOT NULL COMMENT '发送者ID',
    identity INTEGER NOT NULL DEFAULT 3 COMMENT '权限: 1是群主 2是管理员 3是群众',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间，默认当前时间',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间，默认当前时间，更新时自动更新时间'
);
`;
// 创建房间聊天记录表的SQL语句
const createGroupChatTableSql = `
CREATE TABLE group_chat (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增的主键',
    roomId VARCHAR(255) NOT NULL COMMENT '房间号',
    sendId INTEGER NOT NULL COMMENT '发送者ID',
    conment VARCHAR(255) COMMENT '内容',
    type INTEGER DEFAULT 1 COMMENT '聊天内容类型 1:普通聊天回话 2:表情包 3:图片 4:视频 5:其它文件',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间，默认当前时间',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间，默认当前时间，更新时自动更新时间'
);
`;
// 创建群聊申请表的SQL语句
const createGroupRequestTableSql = `
CREATE TABLE group_request (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增的主键',
    joinId INTEGER NOT NULL COMMENT '加入者id',
    roomId VARCHAR(255)  COMMENT '房间号',
    handleId INTEGER  COMMENT '处理者id',
    conment VARCHAR(255) NOT NULL DEFAULT '你好，我想要加入群聊' COMMENT '附带信息',
    status INTEGER NOT NULL DEFAULT 0 COMMENT '申请状态 1:待加入 2:已同意 3:已拒绝',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间，默认当前时间',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间，默认当前时间，更新时自动更新时间'
);
`;
// 创建房间表
export function createGroupRoomTable(db, callback) {
  db.query(createGroupRoomTableSql, (err, results) => {
    if (err) {
      return callback("创建 group_room 表失败:" + err);
    }
    callback(null, "group_room 表创建成功或已存在");
  });
}
// 创建房间用户表
export function createGroupRoomUserTable(db, callback) {
  db.query(createGroupRoomUserTableSql, (err, results) => {
    if (err) {
      return callback("创建 GroupRoomUser 表失败:" + err);
    }
    callback(null, "group_room_user 表创建成功或已存在");
  });
}
// 创建房间聊天记录表
export function createGroupChatTable(db, callback) {
  db.query(createGroupChatTableSql, (err, results) => {
    if (err) {
      return callback("创建 group_chat 表失败:" + err);
    }
    callback(null, "group_chat 表创建成功或已存在");
  });
}
// 创建群聊申请表
export function createGRoupRequestTable(db, callback) {
  db.query(createGroupRequestTableSql, (err, results) => {
    if (err) {
      return callback("创建 group_request 表失败:" + err);
    }
    callback(null, "group_request 表创建成功或已存在");
  });
}
