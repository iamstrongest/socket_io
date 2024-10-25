import { getChatFn,getRoomFn } from "../dao/chat.js";
/**
 *
 * @param {*} req {roomId:string[房间号]}
 * @returns
 */
export const getChatService = async function (req) {
  const result = await getChatFn(req);
  return result;
};
/**
 *
 * @param {*} req {id:用户id}
 * @returns
 */
export const getRoomService = async function (req) {
  const result = await getRoomFn(req);
  return result;
};

