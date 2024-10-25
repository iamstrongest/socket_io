import { handleFriendRequestFn, getFriendRequestFn } from "../dao/request.js";

/**
 *
 * @param {*} params { id:number[申请记录ID], status:number[状态 1：拒绝 2：同意] }
 * @returns
 */
export const handleFriendRequestService = async function (req) {
  const result = await handleFriendRequestFn(req);
  return result;
};
/**
 *
 * @param {*} req { id:number[当前登录用户ID] }
 * @returns
 */
export const getFriendRequestService = async function (req) {
  const result = await getFriendRequestFn(req);
  return result;
};
