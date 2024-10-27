import {
  registFn,
  loginFn,
  getUserFn,
  addFriendFn,
  getFriendFn,
  getUserDetailFn,
  getAllUserDetailFn,
  updateAvatarFn,
  updateUserinfoFn,
} from "../dao/user.js";
import { serverConfig } from "../config/constraint.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
// 获取当前目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 *
 * @param {*} req { email:string[注册邮箱] , username:string[注册昵称] , password:string[密码],avatar:string[头像]}
 */
export const registService = async function (params) {
  const file = params.file;
  const fileName = params.body["fileName"];
  const dirname = path.join(__dirname, "../public/" + "avatar");
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  const filePath = path.join(dirname, fileName + params.body["timestamp"]);
  //给图片设置存放目录  提前给当前文件夹下建立一个images文件夹  ！！！！
  let tmp = file.path; //获取临时资源文件名，也可以直接赋值给img元素src这个属性
  let newPath = filePath + "." + file.originalname.split(".")[1];
  // //  同步执行读取临时生成的buffer文件
  let fileData = fs.readFileSync(tmp); //将上传到服务器上的临时资源 读取到 一个变量里面
  // //  同步生成新的文件
  fs.writeFileSync(newPath, fileData); //重新书写图片文件  写入到指定的文件夹下
  // //  同步删除临时储存的文件;
  fs.unlinkSync(tmp);
  let publicPath =
    serverConfig.publicPath +
    "/" +
    "avatar/" +
    fileName +
    params.body["timestamp"] +
    "." +
    file.originalname.split(".")[1];
  const req = {};
  req.email = params.body.email;
  req.avatar = publicPath;
  req.password = params.body.password;
  req.username = params.body.username;
  const result = await registFn(req);

  return result;
};
/**
 *
 * @param {*} req {email:string[登陆者邮箱] , password:string[登陆者密码]}
 * @returns
 */
export const loginService = async function (req) {
  const result = await loginFn(req);
  return result;
};
export const logoutService = async function (req) {};
/**
 *
 * @param {*} req {id:number[查询者ID]}
 * @returns
 */
export const getUserinfoService = async function (req) {
  const result = await getUserFn(req);
  return result;
};
/**
 *
 * @param {*} req  {sendId:number[申请者ID] ,receiveId:number[接受者ID], username:string[申请者昵称],conment:string[附带信息]}
 */
export const addFriendService = async function (req) {
  const result = await addFriendFn(req);
  return result;
};

export const deleteFriendService = async function (req) {};
/**
 *
 * @param {*} req { id:number[当前登录用户ID] }
 * @returns
 */
export const getFriendService = async function (req) {
  const result = await getFriendFn(req);
  return result;
};
/**
 *
 * @param {*} req { id:number[查询某个用户详情ID] }
 * @returns
 */
export const getUserDetailService = async function (req) {
  const result = await getUserDetailFn(req);
  return result;
};
export const getAllUserDetailService = async function () {
  const result = await getAllUserDetailFn();
  return result;
};
/**
 *
 * @param {*} params { id:number[查询某个用户详情ID] }
 * @returns
 */
export const updateAvatarService = async function (params) {
  const file = params.file;
  const fileName = params.fileName;
  const dirname = path.join(__dirname, "../public/" + "avatar");
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  const filePath = path.join(dirname, fileName + params.timestamp);
  //给图片设置存放目录  提前给当前文件夹下建立一个images文件夹  ！！！！
  let tmp = file.path; //获取临时资源文件名，也可以直接赋值给img元素src这个属性
  let newPath = filePath + "." + file.originalname.split(".")[1];
  // //  同步执行读取临时生成的buffer文件
  let fileData = fs.readFileSync(tmp); //将上传到服务器上的临时资源 读取到 一个变量里面
  // //  同步生成新的文件
  fs.writeFileSync(newPath, fileData); //重新书写图片文件  写入到指定的文件夹下
  // //  同步删除临时储存的文件;
  fs.unlinkSync(tmp);
  let publicPath =
    serverConfig.publicPath +
    "/" +
    "avatar/" +
    fileName +
    params.timestamp +
    "." +
    file.originalname.split(".")[1];
  const req = {};
  req.id = params.id;
  req.avatar = publicPath;
  const result = await updateAvatarFn(req);
  return result;
};
/**
 *
 * @param {*} req { username:string[昵称], theme:string[主题], description:string[用户描述], id:number[查询某个用户详情ID] }
 * @returns
 */
export const updateUserinfoService = async function (req) {
  const result = await updateUserinfoFn(req);
  return result;
};
