<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-31 12:07:51
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-31 14:01:17
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\components\form\AddGroupForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref } from "vue";
import { createGroupRoom } from "@/utils/api/group_chat"
const base64 = ref();
const roomName = ref();
const fileRef = ref(null);
const props = defineProps({
    confirmFn: Function
})
const onSubmit = async () => {
    const formData = new FormData();
    const file = fileRef.value.files[0];
    const validImageTypes = /^(image\/jpeg|image\/png|image\/gif|image\/bmp|image\/webp)$/;
    if (!(file && validImageTypes.test(file.type))) {
        alert('Valid image file.');
        return;
    }
    if (roomName.length == 0) {
        alert('群聊名称不能为空');
        return;
    }
    formData.append('file', file)
    formData.append('fileName', file.name.split('.')[0])
    formData.append('timestamp', Date.now())
    formData.append('roomName', roomName.value);

    try {
        // 使用 axios 发送 POST 请求
        const response = await createGroupRoom(formData);
        const { data: resp } = response;
        props.confirmFn && props.confirmFn(resp.data.roomId);
        roomName.value = '';
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
const onClick = (event) => {
    event.stopPropagation();
}
</script>
<template>
    <form @submit.prevent="onSubmit" @click="onClick">
        <div class="form_col file">
            <label for="file" class="flie_label">
                <span>上传头像:</span>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shangchuantouxiang"></use>
                    </svg>
                </div>
                <input type="file" name="file" ref="fileRef" id="file" @change="onChange">
                <img :src="base64" alt="预览" v-if="base64">
            </label>
        </div>
        <div class="form_col">
            <label for="group_name"> <span>群聊名称: </span><input type="text" v-model="roomName" id="group_name"
                    name="group_name" placeholder="输入群聊名称"> </label>
        </div>
        <div class="form_col submit">
            <label for="submit"><button type="submit" name="submit" id="submit">创建</button> </label>
        </div>
    </form>
</template>

<style scoped>
form {
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    border: 2px solid #fff;
    border-radius: 4px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* animation: backgroundChangeForm 6s infinite; */
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