import db from "../db/index.js";
export const getNotifyFn = async function (req) {
  const { receiveId } = req;
  const sort = "desc"; //desc降序 asc升序
  const limit = 10;
  const sql = `SELECT * FROM notification where receiveId=? order by updatedAt ${sort}`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [receiveId], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        resolve({
          code: 200,
          message: "查找通知信息成功",
          data: rows,
          g: Date.now(),
        });
      } else {
        resolve({
          code: 200,
          message: "没有更多通知信息了",
          data: [],
          g: Date.now(),
        });
      }
    });
  });
  return sqlData;
};
export const confirmNotifyFn = async function (req) {
  const { status, id } = req;
  const sql = `update notification set status=? where id=?`;
  const sqlData = await new Promise((resolve, reject) => {
    db.query(sql, [status, id], (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.affectedRows > 0) {
        resolve({
          code: 200,
          data: null,
          g: Date.now(),
          message: "已确认",
        });
      }
    });
  });
  return sqlData;
};
