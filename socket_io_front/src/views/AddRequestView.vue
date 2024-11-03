<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 13:20:30
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-03 12:02:48
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\views\AddRequestView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref } from "vue";
import AddFriendForm from "@/components/form/AddFriend.vue"
import AddRoomForm from '@/components/form/AddRoom.vue';
import { useUserStore } from '@/stores/user';
import { insertGroupRequest } from "@/utils/api/group_chat"
const userStore = useUserStore();
const activeSelectId = ref(1);
async function handleClick(status) {
    activeSelectId.value = status;
}
async function confirmAddRoomFn(params) {
    const data = {
        roomId: params.roomId,
        joinId: userStore.user.info.id,
        status: 1,
        conment: params.conment,
    }
    alert('申请成功');
    await insertGroupRequest(data);
}
</script>
<template>
    <div class="add-friend-container" v-if="userStore.user.info.id">
        <p><span :class="{ active: activeSelectId === 1 }" @click="handleClick(1)">好友申请</span>/<span
                :class="{ active: activeSelectId === 2 }" @click="handleClick(2)">群聊申请</span></p>
        <AddFriendForm v-if="activeSelectId === 1"></AddFriendForm>
        <AddRoomForm class="color" v-if="activeSelectId === 2" :has-conment="true" :confirm-fn="confirmAddRoomFn">
        </AddRoomForm>
    </div>
</template>

<style scoped>
.add-friend-container {
    width: 100%;
    height: 95vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: url('@/assets/img/chat_background.png') no-repeat;
    background-position: bottom;
    background-size: cover;
}

p .active {
    color: #1cff00;
}

.color {
    color: #000
}

p {
    margin-bottom: 20px;
}

p span {
    cursor: pointer;
    color: skyblue;
}

p span:hover {
    color: red;
}
</style>