/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-23 21:05:27
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-23 23:29:15
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\db\model\notification.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 创建表的 SQL 语句
const createNotificationSql = `
CREATE TABLE notification (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增的主键',
    sendId INTEGER NOT NULL COMMENT '发出者id',
    receiveId INTEGER NOT NULL COMMENT '接受者id',
    status INTEGER NOT NULL DEFAULT 0 COMMENT '0:通知未处理 1:通知已经处理',
    conment VARCHAR(255)  COMMENT '通知内容',
    type INTEGER NOT NULL COMMENT '通知类型 1:系统通知 2:好友申请通知 3:好友处理申请通知',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间，默认当前时间',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间，默认当前时间，更新时自动更新时间'
);
`;
// 创建用户表
export function createNotificationTable(db, callback) {
  db.query(createNotificationSql, (err, results) => {
    if (err) {
      return callback("创建 Notification 表失败:" + err);
    }
    callback(null, "Notification 表创建成功或已存在");
  });
}
