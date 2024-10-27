// 导入 express 模块
import express from "express";
const router = express.Router();
import {
  registController,
  loginController,
  logoutController,
  getUserinfoController,
  addFriendController,
  deleteFriendController,
  getFriendController,
  getUserDetailController,
  getAllUserDetailController,
  updateAvatarController,
  updateUserinfoController,
} from "../controller/user.js";
import { registerForm, updateAvatar } from "../config/form.js";

export const registRoute = router.post(
  "/register",
  registerForm,
  registController
);
export const loginRoute = router.post("/login", loginController);
export const logoutRoute = router.post("/logout", logoutController);
export const getUserinfoRoute = router.get("/userinfo", getUserinfoController);
export const updateUserinfoRoute = router.put(
  "/userinfo",
  updateUserinfoController
);
export const updateAvatarRoute = router.put(
  "/avatar",
  updateAvatar,
  updateAvatarController
);
export const addFriendRoute = router.post("/friend", addFriendController);
export const deleteFriendRoute = router.delete(
  "/friend",
  deleteFriendController
);
export const getUserDetailRoute = router.get(
  "/detail",
  getUserDetailController
);
export const getAllUserDetailRoute = router.get(
  "/alluser",
  getAllUserDetailController
);
export const getFriendRoute = router.get("/friend", getFriendController);
