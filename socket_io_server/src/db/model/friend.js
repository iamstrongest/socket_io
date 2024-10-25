/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 14:02:59
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-24 11:08:34
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\db\model\friend.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 创建表的 SQL 语句
const createFriendTableSql = `
CREATE TABLE friend (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增的主键',
    sendId INTEGER NOT NULL COMMENT '主动申请者id',
    receiveId INTEGER NOT NULL COMMENT '接受者id',
    status INTEGER NOT NULL DEFAULT 0 COMMENT '1:不是好友 2:好友',
    roomId VARCHAR(255)  COMMENT '房间号',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间，默认当前时间',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间，默认当前时间，更新时自动更新时间'
);
`;
// 创建用户表
export function createFriendTable(db, callback) {
  db.query(createFriendTableSql, (err, results) => {
    if (err) {
      return callback("创建 Friends 表失败:" + err);
    }
    callback(null, "Friend 表创建成功或已存在");
  });
}
