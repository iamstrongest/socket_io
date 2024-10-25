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
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
