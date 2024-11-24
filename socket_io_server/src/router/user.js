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
  refreshController,
  getAttendanceController,
  insertAttendanceController,
  getUserAttendanceController,
  absenceController
} from "../controller/user.js";
import middlewares from "../middlewares/index.js";
import { registerForm, updateAvatar } from "../config/form.js";

export const registRoute = router.post(
  "/register",
  registerForm,
  middlewares.checkSpecialParamsFn,
  registController
);
export const loginRoute = router.post("/login", loginController);
export const refreshRoute = router.get("/refresh", refreshController);
export const logoutRoute = router.post("/logout", logoutController);
export const getUserinfoRoute = router.get("/userinfo", getUserinfoController);
export const updateUserinfoRoute = router.put(
  "/userinfo",
  updateUserinfoController
);
export const updateAvatarRoute = router.put(
  "/avatar",
  updateAvatar,
  middlewares.checkSpecialParamsFn,
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
export const getAttendanceRoute = router.get(
  "/attendance",
  getAttendanceController
);
export const insertAttendanceRoute = router.post(
  "/attendance",
  insertAttendanceController
);
export const getUserAttendanceRoute = router.get(
  "/userattendance",
  getUserAttendanceController
);
export const absenceRoute = router.post(
  "/absence",
  absenceController
);