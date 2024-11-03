/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-30 23:09:41
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-03 20:07:11
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\controller\group_chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  getGroupChatService,
  getGroupRoomLastChatListService,
  getGroupRoomListService,
  createGroupRoomService,
  insertGroupRoomUserService,
  insertGroupChatService,
  getGroupRoomService,
  getGroupRoomUserService,
  getGroupUserIdentityService,
  updateGroupUserIdentityService,
  deleteGroupUserService,
  insertGroupRequestService,
  updateGroupRequestService,
  getGroupRequestListService,
} from "../service/group_chat.js";
export const getGroupRoomLastChatListController = async function (req, res) {
  const params = { id: req.query.id };
  const result = await getGroupRoomLastChatListService(params);
  res.send(result);
};
export const getGroupRoomListController = async function (req, res) {
  const params = { joinId: req.query.joinId };
  const result = await getGroupRoomListService(params);
  res.send(result);
};
export const getGroupUserIdentityController = async function (req, res) {
  const params = { roomId: req.query.roomId, joinId: req.query.joinId };
  const result = await getGroupUserIdentityService(params);
  res.send(result);
};
export const getGroupChatController = async function (req, res) {
  const params = { roomId: req.query.roomId, page: req.query.page };
  const result = await getGroupChatService(params);
  res.send(result);
};
export const getGroupRoomController = async function (req, res) {
  const params = { roomId: req.query.roomId };
  const result = await getGroupRoomService(params);
  res.send(result);
};
export const getGroupRoomUserController = async function (req, res) {
  const params = { roomId: req.query.roomId };
  const result = await getGroupRoomUserService(params);
  res.send(result);
};
export const createGroupRoomController = async function (req, res) {
  const file = req.files["file"][0];
  const params = {
    file,
    fileName: req.body.fileName,
    timestamp: req.body.timestamp,
    roomName: req.body.roomName,
  };
  const result = await createGroupRoomService(params);
  res.send(result);
};
export const insertGroupRoomUserController = async function (req, res) {
  const params = {
    roomId: req.body.roomId,
    joinId: req.body.joinId,
    identity: req.body.identity,
  };
  const result = await insertGroupRoomUserService(params);
  res.send(result);
};
export const updateGroupUserIdentityController = async function (req, res) {
  const params = {
    roomId: req.body.roomId,
    joinId: req.body.joinId,
    identity: req.body.identity,
  };
  const result = await updateGroupUserIdentityService(params);
  res.send(result);
};
export const deleteGroupUserController = async function (req, res) {
  const params = {
    roomId: req.body.roomId,
    joinId: req.body.joinId,
  };
  const result = await deleteGroupUserService(params);
  res.send(result);
};
export const insertGroupChatController = async function (req, res) {
  const params = {
    roomId: req.body.roomId,
    sendId: req.body.sendId,
    conment: req.body.conment,
  };
  const result = await insertGroupChatService(params);
  res.send(result);
};
export const insertGroupRequestController = async function (req, res) {
  const params = {
    roomId: req.body.roomId,
    joinId: req.body.joinId,
    status: req.body.status,
    conment: req.body.conment,
  };
  const result = await insertGroupRequestService(params);
  res.send(result);
};
export const updateGroupRequestController = async function (req, res) {
  const params = {
    roomId: req.body.roomId,
    joinId: req.body.joinId,
    handleId: req.body.handleId,
    status: req.body.status,
    conment: req.body.conment,
  };
  const result = await updateGroupRequestService(params);
  res.send(result);
};
export const getGroupRequestListController = async function (req, res) {
  const params = {
    joinId: req.query.joinId,
  };
  const result = await getGroupRequestListService(params);
  res.send(result);
};
