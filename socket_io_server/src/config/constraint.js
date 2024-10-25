// 约束
export const chatType = {
  1: "普通聊天回话",
  2: "表情包",
  3: "图片",
  4: "视频",
  5: "其它文件",
};
export const httpCode = {
  200: "获取请求成功",
  401: "身份认证过期，请重新登录",
  402: "未携带token,非法请求",
  403: "不存在该路由，你怕是请求了个寂寞",
  405: "线上环境禁止代理，只能进行原网站访问",
  418: "账号或密码错误",
  419: "用户不存在",
  420: "用户已经注册，请重新选择用户名",
  421: "你和他已经是好友关系，不能重复添加好友",
  422: "不能添加自己为好友",
  423: "添加的好友不存在，请确认查找的账号是否存在",
  424: "插入好友关系申请失败",
  425: "插入好友申请列表失败",
  426: "等待对方同意或拒绝您的好友申请",
  427: "当前用户已在别的地方进行了登录，请勿泄露个人信息",
};
const httpPort =
  process.env.NODE_ENV === "devlopment"
    ? 3030 //本地开发环境端口
    : process.env.NODE_ENV === "preview"
    ? 3033 //项目打包后，本地预览环境端口
    : 3333; //项目打包后，远程发布上线后的环境端口
// 本地服务器服务器图片上传地址(开发和预览)
const remoteOrigin = "http://121.43.11.11";
const localPublicPath = `http://localhost:${httpPort}`;
// 远程服务器图片上传地址(发布上线)
const productionPublicPath = remoteOrigin + `:${httpPort}`;
// 本地socket.io渎职(开发环境)
const developmentSocketOrigin = `http://localhost:5175`;
// 本地socket.io渎职(预览环境)
const previewSocketOrigin = `http://localhost:${httpPort}`;
// 本地socket.io渎职(发布上线)
const productionSocketOrigin = remoteOrigin + `:${httpPort}`;
// 本地开发端口启动的信息
const developmentMessage = `Express server running at http://127.0.0.1:${httpPort}`;
// 本地预览端口启动的信息
const previewMessage = `Express server running at http://127.0.0.1:${httpPort}/page/`;
// 线上环境端口启动的信息
const productionMessage = `Express server running at ${remoteOrigin}:${httpPort}/page/`;
// 本地启动允许访问的域名
const localHosts = [`127.0.0.1:${httpPort}`, `localhost:${httpPort}`];
// 线上环境允许访问的域名(可以放置被代理)
const productionHosts = [`121.43.11.11:${httpPort}`];
export const serverConfig = {
  httpPort: httpPort,
  publicPath:
    process.env.NODE_ENV === "devlopment" || process.env.NODE_ENV === "preview"
      ? localPublicPath
      : productionPublicPath,
  socketOrigin:
    process.env.NODE_ENV === "devlopment"
      ? developmentSocketOrigin
      : process.env.NODE_ENV === "preview"
      ? previewSocketOrigin
      : productionSocketOrigin,
  message:
    process.env.NODE_ENV === "devlopment"
      ? developmentMessage
      : process.env.NODE_ENV === "preview"
      ? previewMessage
      : productionMessage,
  hosts:
    process.env.NODE_ENV === "devlopment" || process.env.NODE_ENV === "preview"
      ? localHosts
      : productionHosts,
};
export const secretKey = "strongest ^0^";
