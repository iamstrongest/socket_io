<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 14:43:15
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-06 15:01:23
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\views\LoginView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref, shallowRef } from 'vue'
import LoginForm from "@/components/form/Login.vue"
import RegisterForm from "@/components/form/Register.vue"
const componentId = shallowRef(LoginForm);
const btnText = ref("注册");
function toggle() {
    if (componentId.value === LoginForm) {
        btnText.value = "登录"
        componentId.value = RegisterForm
    } else {
        btnText.value = "注册"
        componentId.value = LoginForm
    }
}
</script>
<template>
    <div class="login_view">
        <button class="toggle" type="button" @click="toggle">{{ btnText }}</button>
        <keep-alive>
            <component :is="componentId"></component>
        </keep-alive>
    </div>
</template>
<style scoped>
.login_view {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: url('@/assets/img/login1.jfif') no-repeat;
    background-size: cover;
    background-position: center;
    animation: backgroundChange 6s infinite;
}

@keyframes backgroundChange {
    0% {
        background-image: url('@/assets/img/login1.jfif');
    }

    50% {
        background-image: url('@/assets/img/login2.jfif');
    }

    100% {
        background-image: url('@/assets/img/login3.jfif');
    }
}

.toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 30px;
    border: 2px solid #55bfa0;
    border-radius: 4px;
    color: #50b9fe;
    background-color: #fff;
    margin-bottom: 20px;
}
</style>
