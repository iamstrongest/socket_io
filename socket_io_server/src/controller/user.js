/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 11:06:34
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-24 11:19:56
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\controller\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  registService,
  loginService,
  refreshService,
  getUserinfoService,
  addFriendService,
  getFriendService,
  getUserDetailService,
  getAllUserDetailService,
  updateAvatarService,
  updateUserinfoService,
  getAttendanceService,
  insertAttendanceService,
  getUserAttendanceService,
  absenceService,
} from "../service/user.js";

export const registController = async function (req, res) {
  const file = req.files["file"][0];
  const body = req.body;
  const params = { file, body };
  const result = await registService(params);
  res.send(result);
};
export const loginController = async function (req, res) {
  const params = req.body;
  const result = await loginService(params);
  res.send(result);
};
export const refreshController = async function (req, res) {
  const params = { id: req.id, email: req.email };
  const result = await refreshService(params);
  res.send(result);
};
export const logoutController = async function (req, res) {};

export const addFriendController = async function (req, res) {
  const params = {
    sendId: req.body.sendId,
    conment: req.body.conment,
    receiveId: req.body.receiveId,
  };
  const result = await addFriendService(params);
  res.send(result);
};
export const getUserinfoController = async function (req, res) {
  const params = { email: req.email, id: req.id };
  const result = await getUserinfoService(params);
  res.send(result);
};

export const deleteFriendController = async function (req, res) {};
export const getFriendController = async function (req, res) {
  const params = { id: req.query.id };
  const result = await getFriendService(params);
  res.send(result);
};
export const getUserDetailController = async function (req, res) {
  const params = { id: req.query.id };
  const result = await getUserDetailService(params);
  res.send(result);
};
export const getAllUserDetailController = async function (req, res) {
  const result = await getAllUserDetailService();
  res.send(result);
};
export const updateAvatarController = async function (req, res) {
  const file = req.files["file"][0];
  const params = {
    file,
    id: req.id,
    fileName: req.body.fileName,
    timestamp: req.body.timestamp,
  };
  const result = await updateAvatarService(params);
  res.send(result);
};
export const updateUserinfoController = async function (req, res) {
  const params = {
    id: req.body.id,
    username: req.body.username,
    description: req.body.description,
    theme: req.body.theme,
  };
  const result = await updateUserinfoService(params);
  res.send(result);
};
export const getAttendanceController = async function (req, res) {
  const params = {
    userId: req.query.userId,
    attendance_year_month: req.query.attendance_year_month,
  };
  const result = await getAttendanceService(params);
  res.send(result);
};
export const insertAttendanceController = async function (req, res) {
  const params = {
    userId: req.body.userId,
    userLatitude: req.body.userLatitude, //纬度
    userLongitude: req.body.userLongitude, //经度
  };
  const result = await insertAttendanceService(params);
  res.send(result);
};
export const getUserAttendanceController = async function (req, res) {
  const params = {
    userId: req.query.userId,
    attendance_year_month: req.query.attendance_year_month,
  };
  const result = await getUserAttendanceService(params);
  res.send(result);
};
export const absenceController = async function (req, res) {
  const params = {
    userId: req.body.userId,
    description: req.body.description,
    time: req.body.time,
  };
  const result = await absenceService(params);
  res.send(result);
};
