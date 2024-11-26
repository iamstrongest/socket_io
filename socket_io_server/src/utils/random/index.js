/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2023-09-13 10:37:47
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-26 15:11:08
 * @FilePath: \Front-end\uni-app\uni-project\backstage\utils\random\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const getUuid = function () {
  const uuid = Math.random().toString(36).slice(2);
  return uuid;
};
// 调用函数生成一个随机的 6 位数
export function generateSixDigitNumber() {
  var min = 100000;
  var max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 调用函数生成一个随机的 N 位字符串数
export function randomStr(n1 = 6, n2 = 12) {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let str = "";
  const length = n1 + Math.round(Math.random() * (n2 - n1));
  for (let index = 0; index < length; index++) {
    let random = parseInt(Math.random() * 10);
    if (index == 0) {
      while (random == 0) {
        random = parseInt(Math.random() * 10);
      }
    }
    str += array[random];
  }
  return str;
}
