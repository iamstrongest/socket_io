/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 22:36:01
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-23 22:53:22
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\src\controller\chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getChatService, getRoomService } from "../service/chat.js";
export const getRoomController = async function (req, res) {
  const params = { id: req.query.id, page: req.query.page || 1 };
  const result = await getRoomService(params);
  res.send(result);
};
export const getChatController = async function (req, res) {
  const params = { roomId: req.query.roomId, page: req.query.page };
  const result = await getChatService(params);
  res.send(result);
};
