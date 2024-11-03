<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-01-06 23:26:44
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-01 17:20:53
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
#### middlewares 作为中间件，处理请求到达服务器后，做的一些事情。比如：
1. 接口数据拦截
2. 身份认证
3. 统一错误处理
4. 缓存设置
5. 页面重新发送
6. 设置跨域
7. 静态资源
8. 代理
#### PWA技术
1. 浏览器地址栏会出现安装的标志，允许安装即可
2. 要使 Web 应用程序可安装，它必须在安全上下文中提供。通常意味着它必须通过 HTTPS 提供。本地资源，如 localhost、127.0.0.1 和 file:// 也被视为安全。
3. 暂时不引用service-worker技术
#### 压测接口
全局安装 autocannon
```sh
npm i autocannon -g
```
socket_io_server项目再里面在运行
```sh
npm i autocannon
```
autocannon.js
```js
import autocannon from "autocannon";
// 接口压测工具
autocannon(
  {
    url: "http://122.13.48.121:3333/api/detail?id=7",//压测地址
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9",
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzCI6MTczzMwNDU0NjY1fQ.3giUqkKqhtrONCMSJQcpi3nqq3GzhqQT8Vy47JPdleU",
      // "cookie": "acw_tc=0bca324216820466206848044ebf9191e5a0e4b89a4e9bc8b18e333d13f537",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: "你的参数",
    method: "GET", // 你接口的methods get / post
    connections: 10, // 连接数(相当于此时间1个用户给服务器发送的请求数量)
    pipelining: 500, // 流水线数量(相当于此时间有N个用户同时访问服务器)
    duration: 10, // 持续时间
  },
  console.log
);
```
运行
```sh
node .\autocannon.js
```
看控制台打印结果，主要看 errors,timeouts 这两个字段就行了
```json
{
  "errors":500,
   "timeouts":500
}
```
## 远程服务器自动化部署，以及代码自动上传git
1. 编写配置文件 socket_io_front项目中的 config目录的deplop.js,是远程项目的配置
```js
export const deployConfig = {
  host: "121.13.18.28",//远程服务器的ip地址,请用自己的(上面的ip地址是乱写的)
  username: "root",//远程服务器的连接用户，请用自己的(上面的username是乱写的)
  password: "SD123dsx.",//远程服务器的密码，请用自己的(上面的username是乱写的)
};
```
2. 编写node-ssh脚本，在socket_io_front项目的根目录下
```js
import { NodeSSH } from "node-ssh";
import { deployConfig } from "./src/config/deploy.js";
import path from "path";
async function deploy() {
  const ssh = new NodeSSH();
  await ssh.connect(deployConfig);//连接的配置
  const localDir = path.resolve(".", "../socket_io_server/src/public/page/"); // 要自动化部署的前端目录
  const remoteDir = "/usr/local/socket_io/socket_io_server/src/public/page/"; // 远程服务器目标目录
  // 指定要排除的文件或目录
  const excludeFiles = ['node_modules']; // 不需要上传的目录，可以根据需要修改,比如说node_modules
  // 检查目标目录是否存在，并在存在时删除
  try {
    const result = await ssh.execCommand(
      `if [ -d ${remoteDir} ]; then rm -rf ${remoteDir}; fi`
    );//如果远程服务器已经有了这个目录，就删除
    console.log(result.stdout); // 输出删除结果
    console.error(result.stderr); // 输出错误信息（如果有）
  } catch (error) {
    console.error(`Error while checking/deleting directory: ${error.message}`);
  }
  // 开始上传
  const result = await ssh.putDirectory(localDir, remoteDir, {
    recursive: true,
    // 定义文件过滤回调函数
    fileCallback: (itemPath) => {
      console.log(`itemPath--->`, itemPath);

      // 判断当前文件是否在排除列表中
      const itemName = path.basename(itemPath);
      const shouldInclude = !excludeFiles.includes(itemName);
      console.log(`Should include ${itemName}: ${shouldInclude}`);
      return shouldInclude;
    },
  });

  console.log(`Upload result: ${result ? "Success" : "Failed"}`);

  ssh.dispose();
}

deploy().catch((err) => {
  console.error(`Deployment error: ${err.message}`);
});

```
3. 执行完 npm run build后，再执行npm run deploy
```sh
npm run build //打包
npm run deploy //自动部署到你想要防止的目录下
```
4. 特殊说明，npm run build 和 npm run deploy其实可以放在一起使用，会先执行npm run build 再执行 npm run deploy
再package.json中，修改命令
```json
 "build": "vite build && node generate-build-info.js && node deploy.js",
```
5. git将代码自动提交,在,socket_io_server根目录的package.json新增指令
```json
{
  "git":"node ./git-commit.js && echo \"node ./git-commit.js successfully\""
}

```
socket_io_server根目录下的git-commit.js，
```js
import { simpleGit } from "simple-git";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { dirname } from "path";
// 获取当前目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const git = simpleGit();

async function commitToGit() {
  try {
    // 设置你的本地仓库路径
    const repoPath = path.resolve(__dirname); // 当前目录
    await git.cwd(repoPath);

    // 检查 Git 仓库状态
    const status = await git.status();
    console.log("当前状态:", status);
    const targetDIrname = path.join(__dirname, "../"); //将前后端2个项目，都进行提交
    // 添加文件到暂存区
    await git.add(`${targetDIrname}`); // 添加所有文件
    console.log("所有文件已添加到暂存区");

    // 提交更改
    const commitMessage = "feat:文件进行最新上传或者做出修改"; // 你可以自定义提交信息
    await git.commit(commitMessage);
    console.log(`已提交更改: ${commitMessage}`);

    // 推送到远程仓库
    await git.push("origin", "master"); // 假设你的主分支是 `master`
    console.log("更改已推送到远程仓库");
    // 执行 script.js
    // exec("node deploy.js", (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Error executing script: ${error.message}`);
    //     return;
    //   }
    //   if (stderr) {
    //     console.error(`stderr: ${stderr}`);
    //     return;
    //   }
    //   console.log(`stdout: ${stdout}`);
    // });
  } catch (error) {
    console.error("错误:", error);
  }
}
commitToGit();
```
当前端执行完代码后，就可以执行 npm run git命令，自动提交代码到git上了
6. 特殊说明，其实可以将第自动化部署放在后端这里处理，把前端的配置放置在后端对应的config目录下，deploy.js脚本防止在socket_io_server根目录下，然后再写指令即可，吧我上面这段打吗注释给取消，就可以实现git提交代码后，自动部署到服务器远程地址。
## 疑难解惑
1. 需要自己手动新建数据库吗？ 不需要，启动命令行就行了，会自动创建表。
2. 本地预览环境和开发环境共享同一个数据库，没有做区分，所以请求的资源图片会根据端口的不同，会出现加载不出来的问题
3. 为什么浏览器允许系统通知，但有时候会接受不到通知？可能因为根据电脑系统设置的一些配置，在某些时间段不允许显示通知
4. 为什么远程部署了，但是通知没有？不能裸ip部署，以及需要https协议才行
5. 为什么线上环境，不需要配置特定的ip地址？ 默认请求当前所部署服务器的根路径，若服务器端口在3000，则部署后就请求3000的端口。
6. 前端打包文件在哪里？ 更改了配置，打包在socket_io_server项目的public目录下的page目录中
7. 为什么有时候发送聊天信息，对方没有接收到？(可能是ChatSingleRoomView.vue组件中，dom监听滑动事件，导致错误，没有执行到io.on('recelive'),就被迫终止了，因此自己没有将新数据添加到数据项中)
8. 是否需要重新启动服务器？ 没有修改后端的配置，是不需要重新启动的，服务器会自动判断当前资源有误做修改
9. 自动化部署上传文件到远程服务器，慢是正常的，请不要终止
10. 自动化上传文件到git，首先需要你将这个项目于git关联了，如果没有关联，需要你手动进行关联
``` sh
git init
git remote add origin https://github.com/dsdjkjas/socket.io.git
```


