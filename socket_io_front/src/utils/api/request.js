/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 23:44:28
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-22 23:44:54
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\utils\api\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "./index";
export function getFriendRequestList(params) {
  const method = "get";
  const url = "/request";
  return service({
    url,
    method,
    params,
  });
}
export function handleFriendRequestList(data) {
  const method = "post";
  const url = "/request";
  return service({
    url,
    method,
    data,
  });
}
export function getGroupRequestList(params) {
  const method = "get";
  const url = "/grouprequest";
  return service({
    url,
    method,
    params,
  });
}
