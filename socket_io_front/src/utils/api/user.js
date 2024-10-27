/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 15:13:08
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-27 14:04:14
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\utils\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 15:13:08
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-22 20:53:22
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\src\utils\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "./index";

export function login(data) {
  const method = "post";
  const url = "/login";
  return service({
    url,
    method,
    data,
  });
}

export function getUserinfo() {
  const method = "get";
  const url = "/userinfo";
  return service({
    url,
    method,
  });
}
export function updateUserinfoFn(data) {
  const method = "put";
  const url = "/userinfo";
  return service({
    url,
    method,
    data,
  });
}
export function register(data) {
  const method = "post";
  const url = "/register";
  return service({
    url,
    method,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function updateAvatarFn(data) {
  const method = "put";
  const url = "/avatar";
  return service({
    url,
    method,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getFriend(params) {
  const method = "get";
  const url = "/friend";
  return service({
    url,
    method,
    params,
  });
}
export function addFriend(data) {
  const method = "post";
  const url = "/friend";
  return service({
    url,
    method,
    data,
  });
}
export function getUserDetailFn(params) {
  const method = "get";
  const url = "/detail";
  return service({
    url,
    method,
    params,
  });
}
export function getAllUserDetailFn() {
  const method = "get";
  const url = "/alluser";
  return service({
    url,
    method,
  });
}
