/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-31 12:16:00
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-03 11:40:52
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\utils\api\group_chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "./index";
export function getGroupUserIdentity(params) {
  const method = "get";
  const url = "/groupidentity";
  return service({
    url,
    method,
    params,
  });
}
export function getGroupRoomList(params) {
  const method = "get";
  const url = "/grouproom";
  return service({
    url,
    method,
    params,
  });
}
export function getGroupRoom(params) {
  const method = "get";
  const url = "/groupinfo";
  return service({
    url,
    method,
    params,
  });
}
export function getGroupRoomUser(params) {
  const method = "get";
  const url = "/groupuser";
  return service({
    url,
    method,
    params,
  });
}
export function getGroupRoomLastChatList(params) {
  const method = "get";
  const url = "/grouproomchat";
  return service({
    url,
    method,
    params,
  });
}
export function getGroupRoomChatList(params) {
  const method = "get";
  const url = "/groupchat";
  return service({
    url,
    method,
    params,
  });
}
export function insertGroupChat(data) {
  const method = "post";
  const url = "/groupchat";
  return service({
    url,
    method,
    data,
  });
}
export function createGroupRoom(data) {
  const method = "post";
  const url = "/grouproom";
  return service({
    url,
    method,
    data,
  });
}
export function insertGroupRoomUser(data) {
  const method = "post";
  const url = "/grouproomuser";
  return service({
    url,
    method,
    data,
  });
}
export function updateGroupUserIdentity(data) {
  const method = "put";
  const url = "/groupidentity";
  return service({
    url,
    method,
    data,
  });
}
export function deleteGroupUser(data) {
  const method = "delete";
  const url = "/grouproomuser";
  return service({
    url,
    method,
    data,
  });
}
export function insertGroupRequest(data) {
  const method = "post";
  const url = "/grouprequest";
  return service({
    url,
    method,
    data,
  });
}
export function updateGroupRequest(data) {
  const method = "put";
  const url = "/grouprequest";
  return service({
    url,
    method,
    data,
  });
}
