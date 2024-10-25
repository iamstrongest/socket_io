// 导入 express 模块
import express from "express";
// 创建 express 的服务器实例
const app = express();
import http from "http";
import { serverConfig } from "./src/config/constraint.js";
// TODO_01：请配置 Session 中间件
import session from "express-session";
import cors from "cors";
import "./src/db/index.js";
import routes from "./src/router/index.js";
import middlewares from "./src/middlewares/index.js";
import { ioInit } from "./src//utils/socket//index.js";
app.use(
  session({
    secret: "strongest", //加密钥匙
    resave: true, //每次生成session，自动会记录时间
    saveUninitialized: true, //进入就会生成一个无效的cookie，只有完成验证后，才会生成有效的cookie值
    cookie: {
      maxAge: 1000 * 60 * 60, //60分钟过期
    },
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
// 静态资源目录
app.use(express.static("./src/public"));
app.use(middlewares.cacheFn);
// 解析 POST 提交过来的表单数据

app.use(middlewares.authFn);
app.use(middlewares.validateFn);
app.use(middlewares.noRoutesFn);
app.use(routes);
app.use(middlewares.serverErrorFn);
// 调用 app.listen 方法，指定端口号并启动web服务器
const server = http.createServer(app);
ioInit(server);
server.listen(serverConfig.httpPort, function () {
  console.log(serverConfig.message);
});
