<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 20:46:52
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-27 11:59:11
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\components\friend\FriendList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { getFriend } from "@/utils/api/user"
import NoData from "@/components/NoData.vue"
import { useNotifyStore } from "@/stores/notify"
import { useChatStore } from "@/stores/chat"
const notifyStore = useNotifyStore()
const userStore = useUserStore();
const chatStore = useChatStore();
const router = useRouter()
const friendList = ref([]);
const resizableRef = ref();
const resizerRef = ref();
onBeforeMount(async () => {
    const params = { id: userStore.user.info.id };
    const { data: resp } = await getFriend(params);
    const { data } = resp;
    if (resp.code === 200) {
        friendList.value = data;
    }
})
/**
 * 
 * @param roomId 房间号
 */
function jump(roomId, receiveId) {
    notifyStore.updateAsideActive(2);
    chatStore.updateChatActive(roomId);
    chatStore.updateActiveRoomId(roomId);
    let path = `/chat/chatsingleroom/${roomId}?receiveId=${receiveId}`;
    router.push(path)
}
function mousedownHandle(event) {
    event.preventDefault(); // 防止文本选中
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
}
function resize(event) {
    // 计算新的宽度
    const newWidth = event.clientX - resizableRef.value.getBoundingClientRect().left;
    // 设置新的宽度
    if (newWidth > 150 && newWidth < 300) { // 最小宽度限制
        resizableRef.value.style.width = newWidth + 'px';
    }
}

function stopResize() {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
}
</script>
<template>
    <div class="FriendList-container" ref="resizableRef">
        <h3>好友列表</h3>
        <div class="resizer" ref="resizerRef" @mousedown="mousedownHandle"></div>
        <template v-if="friendList.length > 0">
            <div class="frind hover" v-for="(item) of friendList" :key="item.roomId"
                @click="jump(item.roomId, item.id)">
                <img :src="item.avatar" alt="用户头像" title="用户头像">
                <strong :title="item.username">{{ item.username }}</strong>
            </div>
        </template>
        <NoData class="no-data" v-else>
        </NoData>
    </div>
</template>

<style scoped>
.FriendList-container {
    width: 150px;
    height: 100vh;
    position: relative;
    padding: 1px;
    box-sizing: border-box;
    overflow-y: auto;
}

.FriendList-container h3 {
    text-align: center;
    height: 40px;
    line-height: 40px;
}

.resizer {
    width: 1px;
    height: 100%;
    background-color: var(--resizer_background_color);
    position: absolute;
    right: 0;
    top: 0;
    cursor: ew-resize;
    /* 水平调整光标 */
}

.frind {
    cursor: pointer;
    box-sizing: border-box;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 2px;
    padding-left: 5px;
    margin-bottom: 20px;
}

.frind div {
    margin-right: 5px;
}

.frind img {
    width: 30px;
    height: 30px;
}

.frind strong {
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 隐藏溢出部分 */
    text-overflow: ellipsis;
}

.no-data {
    flex: 1;
}

.hover:hover {
    background-color: #dedbda;
}
</style>