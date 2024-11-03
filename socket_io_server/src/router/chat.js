// 导入 express 模块
import express from "express";
const router = express.Router();
import { getChatController,getRoomController } from "../controller/chat.js";
export const getChatRoute = router.get("/chat", getChatController);
export const getRoomRoute = router.get("/room", getRoomController);
