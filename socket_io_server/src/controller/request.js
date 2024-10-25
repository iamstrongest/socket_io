import {
  getFriendRequestService,
  handleFriendRequestService,
} from "../service/request.js";
export const getFriendRequestController = async function (req, res) {
  const params = { id: req.query.id };
  const result = await getFriendRequestService(params);
  res.send(result);
};
export const handleFriendRequestController = async function (req, res) {
  const params = {
    id: req.body.id,
    status: req.body.status,
    receiveId: req.body.receiveId,
    sendId: req.body.sendId,
    conment: req.body.conment,
  };
  const result = await handleFriendRequestService(params);
  res.send(result);
};
