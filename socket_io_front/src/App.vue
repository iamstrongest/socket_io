<script setup>
import { RouterView } from 'vue-router'
import { onBeforeMount, onBeforeUnmount, getCurrentInstance } from "vue";
import { checkVersion } from "@/utils/version";
const {
  proxy
} = getCurrentInstance();
let intervalTime = null;
function intervalCheckVersion(time) {
  intervalTime = setInterval(() => {
    checkVersion(proxy.$timestamp);
  }, time);
}
// 监听浏览器页面是否更新
function checkVersionHandler() {
  const time = 10000; // 刷新时间间隔10s
  intervalCheckVersion(time);
}
onBeforeMount(() => {
  checkVersionHandler()
})
onBeforeUnmount(() => {
  clearInterval(intervalTime);
  intervalTime = null;
})
window.addEventListener("online", () => {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const networkType = connection.effectiveType; // 网络类型
      console.log('当前网络类型:', networkType); // 输出 '4g', 'wifi', '3g', '2g'等
    }
  } else {
    console.log('该浏览器不支持网络信息API');
  }
  console.log("有网")
})
window.addEventListener("offline", () => {
  console.log("断网了")
})
sessionStorage.setItem("needFresh", false);
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
