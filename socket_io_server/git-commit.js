/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-16 14:14:19
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-27 20:19:12
 * @FilePath: \Front-end\Vue\Vue3\demo\认证\backage\git-commit.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    exec("node deploy.js", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  } catch (error) {
    console.error("错误:", error);
  }
}

commitToGit();
