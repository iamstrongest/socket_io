import { getNotifyFn, confirmNotifyFn } from "../dao/notify.js";
/**
 *
 * @param {*} params { receiveId:number[接受者ID] }
 * @returns
 */
export const getNotifyService = async function (req) {
  const result = await getNotifyFn(req);
  return result;
};
/**
 *
 * @param {*} params { id:number[通知id],status:状态 }
 * @returns
 */
export const confirmNotifyService = async function (req) {
  const result = await confirmNotifyFn(req);
  return result;
};
confirmNotifyService;
