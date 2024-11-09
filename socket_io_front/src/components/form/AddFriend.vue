<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 14:59:09
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-09 10:07:18
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\components\form\AddFriend.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { reactive, computed, onMounted } from 'vue'
import { addFriend } from "@/utils/api/user"
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { getSocket } from "@/socket";
// import { socket } from "@/socket";
const userStore = useUserStore();
const username = computed(() => userStore.user.info.username);
const AddFriendForm = reactive({
    receiveId: "",
    conment: "",
})
onMounted(() => {
    AddFriendForm.conment = `您好，我是${userStore.user.info.username},想要添加你成为好友`;
});
const router = useRouter();
const onSubmit = async () => {
    try {
        // 使用 axios 发送 POST 请求
        const params = {
            sendId: userStore.user.info.id,
            receiveId: Number(AddFriendForm.receiveId),
            conment: AddFriendForm.conment,
            status: 0,
            username: username.value
        }
        const socketData = {
            sendId: userStore.user.info.id,
            receiveId: Number(AddFriendForm.receiveId),
            conment: AddFriendForm.conment,
            type: 2,
        }
        const { data: resp } = await addFriend(params);
        AddFriendForm.id = '';
        AddFriendForm.conment = '';
        if (resp.code === 200) {
            alert(resp.message)
            const socket = getSocket();
            socket.emit("send_notify", socketData);//能够添加后，在发送通知
            // 跳转好友申请列表
            router.push('/chat/request');
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
                <label for="text"><span>用户ID: </span> <input type="text" v-model="AddFriendForm.receiveId" name="text"
                        id="text" placeholder="输入用户ID"></label>
            </div>
            <div class="form_col">
                <label for="password">
                    <div>附带信息: </div>
                    <textarea type="text" :placeholder="AddFriendForm.conment"
                        v-model="AddFriendForm.conment"></textarea>
                </label>
            </div>
            <div class="form_col submit">
                <label for="submit"> <button type="submit" name="submit">提交</button></label>
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
    background-color: var(--add_form_background_color);
    color: var(--add_form_font_color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form_col {
    margin-top: 20px;
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

textarea {
    width: 200px;
    height: 100px;
    border-radius: 3px;
    resize: none;
    /* 禁止大小调整 */
}
</style>