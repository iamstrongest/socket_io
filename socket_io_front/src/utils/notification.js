export function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("权限已授予，可以发送通知");
    } else if (permission === "denied") {
      console.log("权限被拒绝");
    } else {
      console.log("用户未做出选择");
    }
  });
}
