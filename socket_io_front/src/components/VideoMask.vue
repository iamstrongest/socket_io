<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-11-26 13:37:55
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-26 19:50:47
 * @FilePath: \socket_io\socket_io_front\src\components\VideoMask.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%
-->
<script setup>
import { watch, ref, nextTick } from "vue";
const model = defineModel();
const maskRef = ref();
function handleClick(event) {
    event.stopPropagation();
}
watch(model, (newValue, oldValue) => {
    if (newValue === true) {
        nextTick(() => {
            maskRef.value.style.visibility = 'visible';
        })
    }
})
</script>
<template>
    <div v-if="model" ref="maskRef" class="mask" @click="handleClick">
        <slot name="default">
            <text>暂无内容</text>
        </slot>
    </div>
</template>
<style scoped>
.mask {
    position: fixed;
    visibility: hidden;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
