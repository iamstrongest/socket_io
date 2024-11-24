/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 11:29:39
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-22 14:11:22
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\db\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import mysql from "mysql";
import { dbConfig } from "../config/db.js";
import { createUsersTable } from "./model/user.js";
import { createChatTable } from "./model/chat.js";
import { createRequestTable } from "./model/request.js";
import { createFriendTable } from "./model/friend.js";
import { createNotificationTable } from "./model/notification.js";
import {
  createGroupRoomTable,
  createGroupRoomUserTable,
  createGroupChatTable,
  createGRoupRequestTable,
} from "./model/group_chat.js";
import { createAttendanceTable } from "./model/attendance.js";
// 创建数据库连接
const db = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.root, // 替换为你的 MySQL 用户名
  password: dbConfig.password, // 替换为你的 MySQL 密码
});

// 连接到 MySQL 服务器
db.connect((err) => {
  if (err) {
    console.error("连接到 MySQL 服务器失败:", err);
    return;
  }
  console.log("成功连接到 MySQL 服务器");

  // 初始化数据库和表
  initializeDatabase();
});
// 初始化数据库和表
function initializeDatabase() {
  const databaseName = dbConfig.scheam; // 替换为你想要创建的数据库名称

  // 创建数据库
  db.query(
    `CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`,
    (err, results) => {
      if (err) {
        console.error("创建数据库失败:", err);
        return;
      }
      console.log(`数据库 ${databaseName} 创建成功或已存在`);

      // 选择使用的数据库
      db.changeUser({ database: databaseName }, (err) => {
        if (err) {
          console.error("切换数据库失败:", err);
          return;
        }
        console.log(`成功切换到数据库 ${databaseName}`);
        function callback(err, message) {
          if (err) {
            console.error(err);
          }
          console.log(message);
        }
        // 创建表
        // 创建用户表
        createUsersTable(db, callback);
        // 创建聊天记录表
        createChatTable(db, callback);
        // 创建好友申请表
        createRequestTable(db, callback);
        // 创建好友列表
        createFriendTable(db, callback);
        // 创建通知信息表
        createNotificationTable(db, callback);
        // 创建房间表
        createGroupRoomTable(db, callback);
        // 创建房间用户表
        createGroupRoomUserTable(db, callback);
        // 创建群聊天记录表
        createGroupChatTable(db, callback);
        // 创建群聊申请表
        createGRoupRequestTable(db, callback);
        // 创建考勤表
        createAttendanceTable(db, callback);
      });
    }
  );
}
export default db;
