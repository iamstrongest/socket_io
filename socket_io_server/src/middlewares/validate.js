/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-01-01 23:24:05
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 09:08:40
 * @FilePath: \Front-end\uni-app\uni-project\backstage\utils\middleware\validate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import db from "../db/index.js";
import { httpCode } from "../config/constraint.js";
export const validateFn = function (req, res, next) {
  console.log(2222);

  const uuid = req.headers.uuid;
  const id = req.id;
  if (uuid && id) {
    db.query(`select * from user  WHERE id =?`, [id], (err, results) => {
      if (results[0].uuid === uuid) {
        next();
      } else {
        return res.send({
          code: 427,
          message: httpCode[427],
          data: null,
          g: Date.now(),
        });
      }
    });
  } else {
    next();
  }
};
