// 导入 express 模块
import express from "express";
const router = express.Router();
import { getNotifyController,confirmNotifyController } from "../controller/notify.js";
export const getNotify = router.get("/notify", getNotifyController);
export const comfirmNotify = router.put("/notify", confirmNotifyController);
