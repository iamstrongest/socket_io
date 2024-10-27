<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { updateAvatarFn, updateUserinfoFn } from "@/utils/api/user";
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const form = reactive({});
const isChange = ref(false);
const fileRef = ref();
onBeforeMount(async () => {
    form.src = userStore.user.info.avatar;
    form.username = userStore.user.info.username;
    form.description = userStore.user.info.description;
    form.theme = userStore.user.info.theme;
})
const onChange = (event) => {
    isChange.value = true;
    const file = event.target.files[0];
    const validImageTypes = /^(image\/jpeg|image\/png|image\/gif|image\/bmp|image\/webp)$/;
    if (!(file && validImageTypes.test(file.type))) {
        alert('Valid image file.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64String = e.target.result; // 获取文件的 Base64 字符串
        form.src = base64String; // 显示预览
    };
    reader.readAsDataURL(file);
}
async function uploadHandle() {
    if (!isChange.value) {
        return alert('请更改图片后，再进行上传');
    }

    const formData = new FormData();
    const file = fileRef.value.files[0];
    formData.append('file', file)
    formData.append('fileName', file.name.split('.')[0])
    formData.append('timestamp', Date.now())
    const { data: resp } = await updateAvatarFn(formData);
    if (resp.code === 200) {
        await userStore.setUserInfo();
    }
}
async function submitHandle() {
    const data = {
        id: userStore.user.info.id,
        username: form.username,
        description: form.description,
        theme: form.theme
    }
    if (form.username.length == 0) {
        alert('注册昵称不能为空');
        return;
    }
    if (form.description.length == 0) {
        alert('注册昵称不能为空');
        return;
    }
    const { data: resp } = await updateUserinfoFn(data);
    if (resp.code === 200) {
        await userStore.setUserInfo();
    }
}
</script>
<template>
    <div class="edit-container">
        <div class="file-container">
            <label for="file" class="flie_label">
                <span>更改头像: </span>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shangchuantouxiang"></use>
                    </svg>
                </div>
                <input type="file" name="file" ref="fileRef" id="file" @change="onChange">
                <img :src="form.src" alt="预览图">
            </label>
            <div class="form_col">
                <button type="button" class="upload" @click="uploadHandle">上传</button>
            </div>
        </div>
        <form @submit.prevent="submitHandle">
            <div class="form_col">
                <label for="username"> <span>昵称: </span><input type="text" v-model="form.username" id="username"
                        name="username"> </label>
            </div>
            <div class="form_col">
                <label for="description"> <span>描述: </span><input type="text" v-model="form.description"
                        id="description" name="description"> </label>
            </div>
            <div class="form_col">
                <p>主题选择</p>
                <label for="dark">
                    <span>暗色:</span> <input type="radio" id="dark" v-model="form.theme" value="dark" />
                </label>
                <label for="light">
                    <span>亮色:</span> <input type="radio" id="light" v-model="form.theme" value="light" />
                </label>
            </div>
            <div class="form_col submit">
                <label for="submit"><button type="submit" name="submit" id="submit">更改</button> </label>
            </div>
        </form>
    </div>
</template>

<style scoped>
.edit-container {
    flex: 1;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.file-container {
    padding: 10px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
}

.flie_label div {
    cursor: pointer;
    width: 100px;
    height: 100px;
}

.flie_label img {
    width: 100px;
    height: 100px;
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

form {
    margin-top: 10px;
    width: 300px;
    height: 200px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form_col {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
}

.upload {
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
</style>