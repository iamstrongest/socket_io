/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-30 23:07:52
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-01 15:00:01
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\service\group_chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  getGroupChatFn,
  getGroupRoomLastChatListFn,
  createGroupRoomFn,
  insertGroupRoomUserFn,
  insertGroupChatFn,
  getGroupRoomFn,
  getGroupRoomUserFn,
  getGroupUserIdentityFn,
  updateGroupUserIdentityFn,
  deleteGroupUserFn,
  insertGroupRequestFn,
  updateGroupRequestFn,
  getGroupRequestListFn,
  getGroupRoomListFn
} from "../dao/group_chat.js";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { serverConfig } from "../config/constraint.js";
// 获取当前目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 *
 * @param {*} req {roomId:string[房间号],joinId:number[用户Id]}
 * @returns
 */
export const getGroupUserIdentityService = async function (req) {
  const result = await getGroupUserIdentityFn(req);
  return result;
};
/**
 *
 * @param {*} req {roomId:string|number[房间号]}
 * @returns
 */
export const getGroupChatService = async function (req) {
  const result = await getGroupChatFn(req);
  return result;
};
/**
 *
 * @param {*} req {id:number[用户id]}
 * @returns
 */
export const getGroupRoomListService = async function (req) {
  const result = await getGroupRoomListFn(req);
  return result;
};

/**
 *
 * @param {*} req {id:number[用户id]}
 * @returns
 */
export const getGroupRoomLastChatListService = async function (req) {
  const result = await getGroupRoomLastChatListFn(req);
  return result;
};
/**
 *
 * @param {*} req {roomId:string[群聊id]}
 * @returns
 */
export const getGroupRoomService = async function (req) {
  const result = await getGroupRoomFn(req);
  return result;
};
/**
 *
 * @param {*} req {roomId:string[群聊id]}
 * @returns
 */
export const getGroupRoomUserService = async function (req) {
  const result = await getGroupRoomUserFn(req);
  return result;
};

/**
 *
 * @param {*} req {  file,File[文件],fileName:string [文件名]timestamp: number[时间戳]  roomName:string[群聊名称]}
 * @returns
 */
export const createGroupRoomService = async function (params) {
  console.log(params);

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
  req.roomName = params.roomName;
  req.avatar = publicPath;
  const result = await createGroupRoomFn(req);
  return result;
};
/**
 *
 * @param {*} req {roomId:string[群聊id],joinId:number[用户id]}
 * @returns
 */
export const insertGroupRoomUserService = async function (req) {
  const result = await insertGroupRoomUserFn(req);
  return result;
};

/**
 *
 * @param {*} req {roomId:string[群聊id],joinId:number[用户id],identity:number[权限]}
 * @returns
 */
export const updateGroupUserIdentityService = async function (req) {
  const result = await updateGroupUserIdentityFn(req);
  return result;
};
/**
 *
 * @param {*} req {roomId:string[群聊id],joinId:number[用户id]}
 * @returns
 */
export const deleteGroupUserService = async function (req) {
  const result = await deleteGroupUserFn(req);
  return result;
};
/**
 *
 * @param {*} req {roomId:string[群聊id],joinId:number[用户id],conment:string[留言]}
 * @returns
 */
export const insertGroupChatService = async function (req) {
  const result = await insertGroupChatFn(req);
  return result;
};
/**
 *
 * @param {*} req {roomId:string[群聊id],joinId:number[用户id], status:number[同意或者拒绝], conmentconment:string[留言]}
 * @returns
 */
export const insertGroupRequestService = async function (req) {
  const result = await insertGroupRequestFn(req);
  return result;
};
/**
 *
 * @param {*} req {roomId:string[群聊id],joinId:number[用户id],  handleId:number[处理人id], status:number[同意或者拒绝], conmentconment:string[留言]}
 * @returns
 */
export const updateGroupRequestService = async function (req) {
  const result = await updateGroupRequestFn(req);
  return result;
};
export const getGroupRequestListService = async function (req) {
  const result = await getGroupRequestListFn(req);
  return result;
};
