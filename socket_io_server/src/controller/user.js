import {
  registService,
  loginService,
  getUserinfoService,
  addFriendService,
  getFriendService,
  getUserDetailService,
  getAllUserDetailService
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
