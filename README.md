<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-01-06 23:26:44
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 17:15:29
 * @FilePath: \Front-end\uni-app\uni-project\REMADE.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 目录
## 前端
1. 进入socket_io_front目录
2. 包装包
```bash
npm i
```
### 启动
```bash
 npm run dev
```
### 打包
1. 进行了配置，打包结果socket_io_server项目的public目录下的page目录中
2. 想要修改，可以在vite.config.js修改
```js
    base: "/page",//项目根地址设为page
    outDir: path.resolve(__dirname, "../socket_io_server/public/page"), //打包路径,
```
3. 命令启动
```bash
 npm run build
```

## 后端
1. 进入socket_io_server目录
2. 安装全局包pm2,nodemon(没有要安装，有的话忽略)
```bash
npm i pm2  -g
npm i  nodemon -g
```
3. 安装其它包
```bash
npm i
```
4. 确保已经安装了 mysql，没有自行下载
### 配置修改
1. mysql修改：在config目录，修改db.js文件
```js
export const dbConfig = {
  root: "root", //换成自己mysql用户名
  password: "123123", //换成自己mysql密码
  scheam: "im_chat", //数据库名称
  host: "localhost", //数据库IP地址
};
```
2. 后端服务器端口修改：在config目录，修改constraint.js文件,修改httpPort
```js
const httpPort = 3000
```
2. socket.io修改：在config目录，修改constraint.js文件,修改 serverConfig.socketOrigin
开发环境下，要与前端服务器启动的端口一致，比如前端端口为5173，那么socketOrigin:"http://localhost:5173"
```js
//开发环境
const developmentSocketOrigin = "http://localhost:5173"；
// 预览环境
const developmentSocketOrigin = "http://localhost:3033"；
 // 远程服务器线上环境(自己修改)
const developmentSocketOrigin = "http://45.12.33.11:3033"；//修改这个地址
```
# 启动服务器需要的步骤,在socket_io_server目录打开命令行终端
1.开发环境启动
```bash
npm run dev
```
2. 预览环境启动
```bash
npm run preview
```
3. 线上环境启动
```bash
npm run start:pm2
```
### 解读后端接口
1. 从router目录，index.js作为各个接口模块的汇入口，各个子模块拥有对应自身的接口
2. 各个接口对应的Controller层作为前端传递参数的汇入口，在这里处理参数，并且将最终Service层返回的数据给前端
3. Service层处理一些不与数据库的操作，比如文件处理，一般不进行与数据库打交道，并且将dao层返回的数据给Controller层
4. dao层负责与数据库打交道，涉及数据库的操作，都在这里进行
### 其它
middlewares 作为中间件，处理请求到达服务器后，做的一些事情。比如：
1. 接口数据拦截
2. 身份认证
3. 统一错误处理
4. 缓存设置
5. 页面重新发送
6. 设置跨域
7. 静态资源
8. 代理
## 自动化部署
暂时不做更新了
## 疑难解惑
1. 需要自己手动新建数据库吗？ 不需要，启动命令行就行了，会自动创建表。
2. 本地预览环境和开发环境共享同一个数据库，没有做区分，所以请求的资源图片会根据端口的不同，会出现加载不出来的问题
3. 为什么浏览器允许系统通知，但有时候会接受不到通知？可能因为根据电脑系统设置的一些配置，在某些时间段不允许显示通知
4. 为什么远程部署了，但是通知没有？不能裸ip部署，以及需要https协议才行
5. 为什么线上环境，不需要配置特定的ip地址？ 默认请求当前所部署服务器的根路径，若服务器端口在3000，则部署后就请求3000的端口。
6. 前端打包文件在哪里？ 更改了配置，打包在socket_io_server项目的public目录下的page目录中
7. 为什么有时候发送聊天信息，对方没有接收到？ 个人也不清楚，有时候能接受到，有时候又不行。



