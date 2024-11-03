/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-11-01 16:48:06
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-02 18:22:17
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_server\autocannon.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import autocannon from "autocannon";
// 接口压测工具
autocannon(
  {
    url: "http://localhost:3000/api/alluser",
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9",
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEzMDkxNDgzNThAcXEuY29tIiwiaWQiOjEsImlhdCI6MTczMDU0MjU1NCwiZXhwIjoxNzMwNTQ2MTU0fQ._zgOaYMsaqsJ2qnbV3QcrbHuuoqg-pSL-5x8xTFz2aM",
      // "cookie": "acw_tc=0bca324216820466206848044ebf9191e5a0e4b89a4e9bc8b18e333d13f537",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      uuid: "zjdgv4vvaj9",
    },
    body: "你的参数",
    method: "GET", // 你接口的methods get / post
    connections: 10, // 连接数(相当于此时间1个用户给服务器发送的请求数量)
    pipelining: 50, // 流水线数量(相当于此时间有N个用户同时访问服务器)
    duration: 10, // 持续时间
  },
  console.log
);
