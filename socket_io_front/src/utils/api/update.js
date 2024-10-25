/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-25 11:38:52
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 11:42:24
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\utils\api\update.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function version() {
  const url = "/page/version.json";
  return fetch(url);
}
