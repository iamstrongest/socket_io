<script setup>
import { useTemplateRef, reactive, ref } from 'vue'
import { register } from "@/utils/api/user"
const fileRef = useTemplateRef('file');
const registerForm = reactive({
    password: "",
    email: "",
    username: ""
})
const base64 = ref();
const onSubmit = async () => {
    const formData = new FormData();
    const file = fileRef.value.files[0];
    const validImageTypes = /^(image\/jpeg|image\/png|image\/gif|image\/bmp|image\/webp)$/;
    if (!(file && validImageTypes.test(file.type))) {
        alert('Valid image file.');
        return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(registerForm.email)) {
        alert('Invalid email address.');
        return;
    }
    if (registerForm.password.length < 6) {
        alert('注册密码不能少于6位数');
        return;
    }
    if (registerForm.username.length == 0) {
        alert('注册昵称不能为空');
        return;
    }
    formData.append('file', file)
    formData.append('fileName', file.name.split('.')[0])
    formData.append('timestamp', Date.now())
    formData.append('email', registerForm.email);
    formData.append('password', registerForm.password);
    formData.append('username', registerForm.username);
    try {
        // 使用 axios 发送 POST 请求
        const response = await register(formData);
        console.log('上传成功:', response.data);
        registerForm.email = '';
        registerForm.password = '';
        registerForm.username = '';
    } catch (error) {
        console.error('上传失败:', error);
    }
}
const onChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64String = e.target.result; // 获取文件的 Base64 字符串
        base64.value = base64String; // 显示预览
    };
    reader.readAsDataURL(file);
}
</script>
<template>
    <div class="form_container">
        <form @submit.prevent="onSubmit">
            <div class="form_col file">
                <label for="file" class="flie_label">
                    <span>上传文件: </span>
                    <div>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shangchuantouxiang"></use>
                        </svg>
                    </div>
                    <input type="file" name="file" ref="file" id="file" @change="onChange">
                    <img :src="base64" alt="预览" v-if="base64">
                </label>
            </div>
            <div class="form_col">
                <label for="password"> <span>昵称: </span><input type="text" v-model="registerForm.username" id="password"
                        name="password" placeholder="输入昵称"> </label>
            </div>
            <div class="form_col">
                <label for="email"> <span>注册邮箱: </span><input type="email" v-model="registerForm.email" id="email"
                        name="email" placeholder="输入邮箱认证"> </label>
            </div>
            <div class="form_col">
                <label for="password"> <span>登录密码: </span><input type="password" v-model="registerForm.password"
                        id="password" name="password" placeholder="输入密码"> </label>
            </div>
            <div class="form_col submit">
                <label for="submit"><button type="submit" name="submit" id="submit">注册</button> </label>
            </div>
        </form>
    </div>
</template>
<style scoped>
.form_container {
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form_col {
    margin-bottom: 20px;

}

.flie_label div {
    cursor: pointer;
    width: 50px;
    height: 50px;
}

.flie_label img {
    width: 40px;
    height: 40px;
}

.flie_label {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
}

#file {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-top: 20px;
    visibility: hidden;
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