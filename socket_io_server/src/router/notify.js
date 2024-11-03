// 导入 express 模块
import express from "express";
const router = express.Router();
import { getNotifyController,confirmNotifyController } from "../controller/notify.js";
export const getNotifyRoute = router.get("/notify", getNotifyController);
export const comfirmNotifyRoute = router.put("/notify", confirmNotifyController);
