<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 14:24:16
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-09 10:51:32
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\views\ChatView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onMounted, onUnmounted, inject } from "vue";
import ChatList from "@/components/chat/Room.vue";
import { RouterView } from "vue-router";
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chat';
const userStore = useUserStore();
const chatStore = useChatStore();
onUnmounted(() => {
    chatStore.resetRoomList();
    chatStore.resetChatList();
})
</script>
<template>
    <div class="chat-container" v-if="userStore?.user?.info?.id">
        <ChatList></ChatList>
        <div class="chat-container-right">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped>
.chat-container {
    width: 100%;
    height: 95vh;
    flex: 1;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
}

.chat-container-right {
    flex: 1;
    background-repeat: no-repeat;
    background-image: var(--default__img);
    background-position: center;
    background-size: cover;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
}
</style>