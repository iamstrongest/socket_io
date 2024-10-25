/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 13:49:36
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-22 22:24:45
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\db\model\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 创建表的 SQL 语句
const createUsersTableSql = `
CREATE TABLE request (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增的主键',
    sendId INTEGER NOT NULL COMMENT '发送者id',
    receiveId INTEGER NOT NULL COMMENT '接受者id',
    conment VARCHAR(255) NOT NULL DEFAULT '你好，我想要申请加你为好友，请通过一下' COMMENT '附带信息',
    status INTEGER NOT NULL DEFAULT 0 COMMENT '申请状态 0:待通知 1:代表拒绝 2代表同意',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间，默认当前时间',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间，默认当前时间，更新时自动更新时间'
);
`;
// 创建用户表
export function createRequestTable(db, callback) {
  db.query(createUsersTableSql, (err, results) => {
    if (err) {
      return callback("创建 Request 表失败:" + err);
    }
    callback(null, "Request 表创建成功或已存在");
  });
}
