<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 17:41:28
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-05 17:15:05
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\components\form\Login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { reactive } from 'vue'
import { login } from "@/utils/api/user"
import { useRouter } from 'vue-router';
import { storageFn } from "@/utils/api/index"
const registerForm = reactive({
    password: "",
    email: "",
})
const router = useRouter();
const onSubmit = async () => {
    try {
        // 使用 axios 发送 POST 请求
        const { data: resp } = await login(registerForm);
        const { data } = resp;
        registerForm.email = '';
        registerForm.password = '';
        if (resp.code === 200) {
            const flag = confirm(resp.message);
            if (flag) {
                storageFn(data.token, data.uuid, data.refresh_token);
                router.push('/');
            }
        }
    } catch (error) {
        console.error('登录失败:', error);
    }
}
</script>
<template>
    <div class="form_container">
        <form @submit.prevent="onSubmit">
            <div class="form_col">
                <label for="email"><span>邮箱: </span> <input type="email" v-model="registerForm.email" name="email"
                        id="email" placeholder="输入邮箱"></label>
            </div>
            <div class="form_col">
                <label for="password"><span>密码: </span> <input type="password" v-model="registerForm.password"
                        name="password" id="password" placeholder="输入密码"></label>
            </div>
            <div class="form_col submit">
                <label for="submit"> <button type="submit" name="submit">登录</button></label>
            </div>
        </form>
    </div>
</template>
<style scoped>
.form_container {
    width: 300px;
    min-height: 200px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('@/assets/img/login_form1.jfif') no-repeat;
    background-size: cover;
    background-position: center;
    animation: backgroundChangeForm 6s infinite;
}

@keyframes backgroundChangeForm {
    0% {
        background-image: url('@/assets/img/login_form1.jfif');
    }

    50% {
        background-image: url('@/assets/img/login_form2.jfif');
    }
}

.form_col {
    margin-bottom: 20px;
    color: #fff;
}

.submit {
    display: flex;
    justify-content: center;
    align-items: center;
}

.form_col button {
    width: 50px;
    height: 30px;
    border: 2px solid #55bfa0;
    border-radius: 4px;
    color: #50b9fe;
    background-color: #fff;
}

input {
    width: 200px;
    height: 40px;
    border-radius: 3px;
}
</style>