/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-12-31 11:16:54
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-02 12:12:08
 * @FilePath: \Front-end\uni-app\uni-project\backstage\middleware\auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import need_routes from "../config/need.routes.js";
import jwt from "../utils/token/index.js";

import { httpCode } from "../config/constraint.js";
export function authFn(req, res, next) {
  const url = req.url;
  const { authorization, refresh_token } = req.headers;
  if (need_routes.some((item) => new RegExp(item).test(url))) {
    if (authorization) {
      const callback = function (flag, params) {
        if (!flag) {
          return res.send({
            code: 401,
            message: httpCode[401],
            data: null,
            g: Date.now(),
          });
        } else {
          req.id = params.id;
          req.email = params.email;
          next(); //没过期放行
        }
      };
      jwt.validate(authorization, callback);
    } else if (refresh_token) {
      const callback = function (flag, params) {
        if (!flag) {
          return res.send({
            code: 406,
            message: httpCode[406],
            data: null,
            g: Date.now(),
          });
        } else {
          req.id = params.id;
          req.email = params.email;
          next(); //没过期放行
        }
      };
      jwt.validate(refresh_token, callback);
    } else {
      return res.send({
        code: 402,
        message: httpCode[402],
        data: null,
        g: Date.now(),
      });
    }
  } else {
    next();
  }
}
