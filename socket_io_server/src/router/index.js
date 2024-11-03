/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 10:54:29
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-31 13:50:04
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_server\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-09-13 10:37:46
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-03-10 22:53:06
 * @FilePath: \Front-end\uni-app\uni-project\backstage\routes\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import express from "express";
import * as userApi from "./user.js";
import * as requestApi from "./request.js";
import * as chatApi from "./chat.js";
import * as notifyApi from "./notify.js";
import * as groupApi from "./group_chat.js";
const router = express.Router();
const api = [];
api.push(...Object.values(userApi));
api.push(...Object.values(requestApi));
api.push(...Object.values(chatApi));
api.push(...Object.values(notifyApi));
api.push(...Object.values(groupApi));
api.forEach((element) => {
  router.use("/api", element);
});
export default router;
