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
