// 导入 express 模块
import express from "express";
const router = express.Router();
import { getChatController,getRoomController } from "../controller/chat.js";
export const getChat = router.get("/chat", getChatController);
export const getRoom = router.get("/room", getRoomController);
