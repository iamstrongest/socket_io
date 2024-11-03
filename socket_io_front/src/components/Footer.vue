<script setup>
import { reactive } from "vue"
const info = reactive({
    eamil: '1309148358@qq.com',
    recordText: "江西网安备 2032512330350号",
    recordOrder: "江B2-20241030-4"
})
function cilckHandle() {
    navigator.clipboard.writeText(eamil.value)
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
        <!-- <p>联系我</p> -->
        <!-- <p><span title="邮箱">邮箱：<i @click="cilckHandle">{{ info.eamil }}</i></span></p> -->
        <p><span>
                <a href="https://beian.mps.gov.cn/#/query/webSearch">
                    {{ info.recordText }}
                </a>
            </span>
            <span>
                <a href="https://beian.miit.gov.cn/">
                    {{ info.recordOrder }}
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