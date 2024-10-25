/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 11:35:24
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 15:05:48
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\db\model\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 创建表的 SQL 语句
const createUsersTableSql = `
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增的主键',
    username VARCHAR(255) NOT NULL COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    avatar VARCHAR(255) COMMENT '头像 URL',
    email VARCHAR(255) NOT NULL UNIQUE COMMENT '电子邮件，唯一',
    uuid VARCHAR(255) DEFAULT 'ekskjdomsidc',
    description VARCHAR(255) DEFAULT '该用户很懒，什么都没有留下' COMMENT '用户介绍',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间，默认当前时间',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间，默认当前时间，更新时自动更新时间'
);
`;
// 创建用户表
export function createUsersTable(db, callback) {
  db.query(createUsersTableSql, (err, results) => {
    if (err) {
      return callback("创建 Users 表失败:" + err);
    }
    callback(null, "Users 表创建成功或已存在");
  });
}
