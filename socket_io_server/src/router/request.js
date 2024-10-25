// 导入 express 模块
import express from "express";
const router = express.Router();
import {
  getFriendRequestController,
  handleFriendRequestController
} from "../controller/request.js";
export const getFriendRequestRoute = router.get(
  "/request",
  getFriendRequestController
);
export const handleFriendRequestRoute = router.post(
  "/request",
  handleFriendRequestController
);