/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-01-01 23:24:05
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 09:46:46
 * @FilePath: \Front-end\uni-app\uni-project\backstage\utils\middleware\validate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import routes from "../config/routes.js";
import path from "path";
import { httpCode } from "../config/constraint.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const noRoutesFn = function (req, res, next) {
  if (
    !routes.some((item) => new RegExp(item).test(req.url)) &&
    req.url.indexOf("/api") !== -1
  ) {
    console.log(`路由请求错误,不存在${req.url}该路由，你怕是请求了个寂寞`);
    return res.status(403).send({
      code: 403,
      message: httpCode[403],
      data: null,
      g: Date.now(),
    });
  } else if (req.url.indexOf("/page") !== -1) {
    // 手动刷新页面，导致请求页面失败，进行重新发送index.html;
    // return res.sendFile(path.join(__dirname, "../public/page/index.html"));
  } else {
    next();
  }
};
