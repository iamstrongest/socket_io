<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-30 13:49:14
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-08 10:27:32
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\components\Footer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { reactive } from "vue"
const info = reactive({
    recordText: "赣ICP备2024047900号",
    email: "1309***3**@qq.com"
})
function cilckHandle() {
    navigator.clipboard.writeText(info.email)
        .then(() => {
            alert('邮箱已复制！');
        })
        .catch(err => {
            console.error('复制失败:', err);
        });
}
</script>
<template>
    <footer>
        <p>
            <span>
                <a href="javascript:void(0);" @click="cilckHandle">
                    联系我: {{ info.email }}
                </a>
            </span>
            <span>
                <a href="https://beian.miit.gov.cn/">
                    {{ info.recordText }}
                </a>
            </span>
        </p>
    </footer>
</template>

<style scoped>
footer {
    width: 100%;
    height: 5vh;
    border-top: 1px solid #ccc;
    background-color: var(--footer_background__color);
    color: var(--footer___color);
    font-size: 16px;
    box-sizing: border-box;
    padding-top: 10px;
}

footer p {
    text-align: center;
    margin-bottom: 10px;
}

footer p span {
    margin-right: 20px;
}

footer p span i {
    cursor: pointer;
}

footer p span a {
    text-decoration: none;
    color: var(--footer___color);
}
</style>