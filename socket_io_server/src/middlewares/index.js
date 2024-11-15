/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 17:03:16
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 20:10:03
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_server\src\middlewares\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { authFn } from "./auth.js";
import { validateFn } from "./validate.js";
import { serverErrorFn } from "./error.js";
import { noRoutesFn } from "./noRoutes.js";
import { cacheFn } from "./cache.js";
import { proxyFn } from "./proxy.js";
import { checkNoramlParamsFn, checkSpecialParamsFn } from "./api.params.js";
export default {
  cacheFn,
  authFn,
  validateFn,
  serverErrorFn,
  noRoutesFn,
  proxyFn,
  checkNoramlParamsFn,
  checkSpecialParamsFn,
};
