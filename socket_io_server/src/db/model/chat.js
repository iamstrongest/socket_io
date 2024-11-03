// 创建表的 SQL 语句
const createChatTableSql = `
CREATE TABLE single_chat (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增的主键',
    roomId VARCHAR(255) NOT NULL COMMENT '房间号',
    sendId INTEGER NOT NULL COMMENT '发送者ID',
    receiveId INTEGER NOT NULL COMMENT '接受者ID',
    conment VARCHAR(255) COMMENT '内容',
    type INTEGER COMMENT '聊天内容类型 1:普通聊天回话 2:表情包 3:图片 4:视频 5:其它文件',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间，默认当前时间',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间，默认当前时间，更新时自动更新时间'
);
`;
// 创建用户表
export function createChatTable(db, callback) {
  db.query(createChatTableSql, (err, results) => {
    if (err) {
      return callback("创建 single_chat 表失败:" + err);
    }
    callback(null, "single_chat 表创建成功或已存在");
  });
}
