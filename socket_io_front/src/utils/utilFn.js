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
