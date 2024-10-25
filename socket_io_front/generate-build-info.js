// generate-build-info.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取当前时间并格式化
const timestamp = Date.now();

// 构建要写入 JSON 文件的内容
const buildInfo = {
  timestamp,
  info: "页面更改，您需要重新刷新啦！",
};
const filePath = path.resolve(__dirname, "./public/version.json");
console.log(`filePath--->`, filePath);

// 写入 JSON 文件
fs.writeFileSync(filePath, JSON.stringify(buildInfo, null, 2), "utf8");

console.log("Build info generated successfully.");
