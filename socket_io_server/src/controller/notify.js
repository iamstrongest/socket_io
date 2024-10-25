import { getNotifyService, confirmNotifyService } from "../service/notify.js";
export const getNotifyController = async function (req, res) {
  const params = { receiveId: req.query.receiveId };
  const result = await getNotifyService(params);
  res.send(result);
};
export const confirmNotifyController = async function (req, res) {
  const params = { id: req.body.id, status: req.body.status };
  const result = await confirmNotifyService(params);
  res.send(result);
};
