export function debounce(fn, time) {
  let timer = null;
  return function () {
    // 如果事件再次触发就清除定时器，重新计时
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, time);
  };
}
export function throttle(fn, time) {
  let timer = null; // 通过闭包保存一个标记
  return function () {
    if (timer) return; // 当定时器没有执行的时候标记永远是null
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为null(关键)
      // 表示可以执行下一次循环了。
      clearTimeout(timer);
      timer = null;
    }, time);
  };
}
export async function getCurrentPosition() {
  // 获取用户当前位置并判断是否在范围内
  const data = await new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          console.log(
            `用户当前位置：纬度 ${userLatitude}, 经度 ${userLongitude}`
          );
          resolve({
            userLatitude,
            userLongitude,
          });
        },
        function (error) {
          alert("无法获取地理位置，请检查定位设置");
          reject({});
        }
      );
    } else {
      alert("浏览器不支持定位功能");
    }
  });
  return data;
}
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
