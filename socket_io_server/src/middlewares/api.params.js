/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-11-11 22:31:52
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-12 12:14:28
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\middlewares\api.params.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { apiNormalParmas, apiSpeciallParmas } from "../config/api.params.js";
import { httpCode } from "../config/constraint.js";
export const checkNoramlParamsFn = function (req, res, next) {
  const url = req.url;
  const method = req.method.toLocaleLowerCase();
  let params = [];
  const arr = [];
  if (url.startsWith("/api")) {
    if (method == "get") {
      params = Object.keys(req.query);
    } else {
      params = Object.keys(req.body);
    }
    const target = apiNormalParmas.find(
      (item) => item.path.indexOf(url) != -1 && item.method == method
    );
    if (target) {
      target.params.forEach((item) => {
        if (!params.includes(item)) {
          arr.push(item); //说明少传递了参数
        }
      });
    }
    //   说明参数少传递了
    if (arr.length > 0) {
      return res.send({
        code: 441,
        message: `${httpCode[441]}${arr.join(", ")}`,
        data: null,
        g: Date.now(),
      });
    }
  }
  // 不是接口，或者是特殊接口，或者参数传递正确，直接放行
  next();
};
export const checkSpecialParamsFn = function (req, res, next) {
  const url = req.url;
  const method = req.method.toLocaleLowerCase();
  let params = [];
  params = Object.keys(req.body);
  if (req.files["file"][0]) {
    params.push(req.files["file"][0].fieldname);
  }
  const target = apiSpeciallParmas.find(
    (item) => item.path.indexOf(url) != -1 && item.method == method
  );
  const arr = [];
  if (target) {
    target.params.forEach((item) => {
      if (!params.includes(item)) {
        arr.push(item); //说明少传递了参数
      }
    });
  }
  //   说明参数都传递了
  if (arr.length > 0) {
    return res.send({
      code: 441,
      message: `${httpCode[441]}${arr.join(", ")}`,
      data: null,
      g: Date.now(),
    });
  }

  // 参数传递正确，放行
  next();
};
