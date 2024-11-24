// 创建考勤表的 SQL 语句
const createAttendanceTableSql = `
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增的主键',
    userId VARCHAR(255) NOT NULL COMMENT '用户账号',
    description VARCHAR(255) DEFAULT '打卡成功' COMMENT '用户打卡说明',
    date VARCHAR(255) NOT NULL COMMENT '打卡日期',
    attendance_year_month VARCHAR(255) NOT NULL COMMENT '用户打卡年限和月份',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间，默认当前时间',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间，默认当前时间，更新时自动更新时间'
);
`;
// 创建考勤表
export function createAttendanceTable(db, callback) {
  db.query(createAttendanceTableSql, (err, results) => {
    if (err) {
      return callback("创建 attendance 表失败:" + err);
    }
    callback(null, "attendance 表创建成功或已存在");
  });
}
