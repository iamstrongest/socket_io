/*
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-01-01 23:24:05
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-01-01 23:35:31
 * @FilePath: \Front-end\uni-app\uni-project\backstage\utils\middleware\validate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const serverErrorFn = function (error, req, res, next) {
  console.log(`error.message---->`, error.message);
  res.status(error.status || 500).json({
    code: 500,
    message: "服务器错误",
    data: null,
  });
};
