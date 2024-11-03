/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 13:42:34
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-31 13:40:20
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\config\form.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import multer from "multer"; //解析上传的文件
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// 获取当前目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//原始上传过来的文件资源存放地
const upload = multer({ dest: path.resolve(__dirname, "../tmp/") }); //会在此目录下生成一个二进制文件，可以直接给img元素赋值
export const registerForm = upload.fields([
  { name: "file" },
  { name: "timestamp" },
  { name: "fileName" },
  { name: "email" },
  { name: "password" },
  { name: "username" },
]);
export const updateAvatar = upload.fields([
  { name: "file" },
  { name: "timestamp" },
  { name: "fileName" },
]);
export const createGroupRoomForm = upload.fields([
  { name: "file" },
  { name: "timestamp" },
  { name: "fileName" },
  { name: "groupName" },
]);
