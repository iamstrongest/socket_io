/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-25 11:38:22
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 11:39:36
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\utils\version.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { version } from "./api/update.js";
export async function checkVersion(params) {
  const hash = params;
  let status = "";
  await version()
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then(({ timestamp, info }) => {
      if (status === 200) {
        if (hash != timestamp) {
          const res = window.confirm(
            info || "系统已经更新，请刷新页面?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          );
          if (res) {
            window.location.reload();
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
    })
    .catch(() => {});
}
