/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-02-28 22:52:10
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 20:30:51
 * @FilePath: \Front-end\uni-app\uni-project\backstage\middleware\proxy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { httpCode } from "../config/constraint.js";
import { serverConfig } from "../config/constraint.js";
export const proxyFn = function (req, res, next) {
  const { host } = req.headers;
  if (serverConfig.hosts.some((item) => new RegExp(item).test(host))) {
    next();
  } else {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).send({
        code: 405,
        message: httpCode[405],
        data: null,
        g: Date.now(),
      });
    }
  }
};
