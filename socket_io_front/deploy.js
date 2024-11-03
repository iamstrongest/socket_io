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