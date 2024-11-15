/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-30 22:51:29
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-11 23:55:19
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\router\group_chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入 express 模块
import express from "express";
const router = express.Router();
import { createGroupRoomForm } from "../config/form.js";
import {
  getGroupChatController,
  getGroupRoomListController,
  getGroupRoomLastChatListController,
  createGroupRoomController,
  insertGroupRoomUserController,
  insertGroupChatController,
  getGroupRoomController,
  getGroupRoomUserController,
  getGroupUserIdentityController,
  updateGroupUserIdentityController,
  deleteGroupUserController,
  insertGroupRequestController,
  updateGroupRequestController,
  getGroupRequestListController,
} from "../controller/group_chat.js";
import middlewares from "../middlewares/index.js";
export const getGroupChatRoute = router.get(
  "/groupchat",
  getGroupChatController
);
export const getGroupRoomListRoute = router.get(
  "/grouproom",
  getGroupRoomListController
);
export const getGroupRoomLastChatListRoute = router.get(
  "/grouproomchat",
  getGroupRoomLastChatListController
);
export const getGroupUserIdentityRoute = router.get(
  "/groupidentity",
  getGroupUserIdentityController
);
export const getGroupRoomRoute = router.get(
  "/groupinfo",
  getGroupRoomController
);
export const getGroupRoomUserRoute = router.get(
  "/groupuser",
  getGroupRoomUserController
);
export const addGroupRoomRoute = router.post(
  "/grouproom",
  createGroupRoomForm,
  middlewares.checkSpecialParamsFn,
  createGroupRoomController
);
export const addGroupRoomUserRoute = router.post(
  "/grouproomuser",
  insertGroupRoomUserController
);
export const updateGroupUserIdentityRoute = router.put(
  "/groupidentity",
  updateGroupUserIdentityController
);

export const deleteGroupUserRoute = router.delete(
  "/grouproomuser",
  deleteGroupUserController
);
export const addGroupChatUserRoute = router.post(
  "/groupchat",
  insertGroupChatController
);
export const insertGroupRequestRoute = router.post(
  "/grouprequest",
  insertGroupRequestController
);
export const updateGroupRequestRoute = router.put(
  "/grouprequest",
  updateGroupRequestController
);
export const getGroupRequestListRoute = router.get(
  "/grouprequest",
  getGroupRequestListController
);
