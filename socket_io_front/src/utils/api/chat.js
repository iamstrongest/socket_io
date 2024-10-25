/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 23:44:21
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-23 09:42:43
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\utils\api\chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "./index";
export function getRoomList(params) {
  const method = "get";
  const url = "/room";
  return service({
    url,
    method,
    params,
  });
}
export function getChat(params) {
  const method = "get";
  const url = "/chat";
  return service({
    url,
    method,
    params,
  });
}
