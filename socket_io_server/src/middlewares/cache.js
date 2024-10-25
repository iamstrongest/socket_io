/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-02-24 11:19:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 09:45:50
 * @FilePath: \Front-end\uni-app\uni-project\backstage\middleware\cache.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { sourceTypeList, expiryType } from "../config/cacheSources.js";
export const cacheFn = function (req, res, next) {
  if (sourceTypeList.some((item) => new RegExp(item).test(req.url))) {
    Object.entries(expiryType).forEach((item) => {
      res.set(item[0], item[1]);
    });
  }
  next();
};
