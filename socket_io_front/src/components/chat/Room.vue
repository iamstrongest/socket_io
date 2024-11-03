<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 10:51:22
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-03 11:30:10
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\components\chat\ChatList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 聊天会话记录列表 -->
<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { chatListType } from "@/config/constraint"
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chat'
import NoData from "@/components/NoData.vue"
const router = useRouter()
const userStore = useUserStore()
const chatStore = useChatStore();
const resizableRef = ref();
const resizerRef = ref();
const searchText = ref('');
const showList = ref([]);
watch(searchText, (newValue, oldValue) => {
    if (newValue.length === 0) {
        showList.value = chatStore.roomList;
    } else {
        showList.value = chatStore.roomList.filter(chat => {
            if (chat.username) {
                return chat.username.indexOf(newValue) !== -1
            } else {
                return chat.roomName.indexOf(newValue) !== -1
            }
        });
    }
})
onBeforeMount(async () => {
    const params = { id: userStore.user.info.id };
    await chatStore.getSingleRoomDataList(params);//私聊
    await chatStore.getGroupRoomLastChatDataList(params);//群聊
    showList.value = chatStore.roomList;
})
/**
 * 
 * @param type -1 新的好友页面 1 与好友聊天  2群聊
 * @param roomId 
 */
function jump(type, id, roomId, receiveId) {
    const obj = chatListType[type];
    let path = obj.path;
    if (roomId && type == 1) {//私聊
        path = `${path}/${roomId}?receiveId=${receiveId}`
    }
    if (roomId && type == 2) {//群聊
        path = `${path}/${roomId}`
    }
    chatStore.updateChatActive(id);
    chatStore.updateActiveRoomId(roomId);
    router.push(path)
    // window.location.href = path;
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
    <div class="chatList-container" ref="resizableRef">
        <h3>聊天记录</h3>
        <div class="resizer" ref="resizerRef" @mousedown="mousedownHandle"></div>
        <div class="search">
            <input type="text" name="search" id="search" placeholder="输入昵称" v-model="searchText">
            <div class="icons">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
            </div>
        </div>
        <div class="new-friends hover" @click="jump(-1, -1)" :class="{ active: chatStore.chatActive == -1 }">
            <i><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xindehaoyou"></use>
                </svg></i>
            <strong>新的申请</strong>
        </div>
        <template v-if="showList.length > 0">
            <div class="room-list hover" v-for="(item) of showList" :key="item.roomId"
                :class="{ active: chatStore.chatActive == item.roomId }"
                @click="jump(item.chatRoomType, item.roomId, item.roomId, item.showUserId)">
                <div>
                    <img :src="item.avatar" alt="用户头像" title="用户头像">
                </div>
                <div class="right-info">
                    <strong v-if="item.chatRoomType == 1" :title="item.username">{{ item.username }}</strong>
                    <strong v-if="item.chatRoomType == 2" :title="item.roomName">{{ item.roomName }}</strong>
                    <span :title="item.lastChat">{{ item.conment }}</span>
                </div>
            </div>
        </template>
        <NoData class="no-data" v-else></NoData>
    </div>
</template>

<style scoped>
.chatList-container {
    width: 150px;
    height: 95vh;
    padding: 1px;
    position: relative;
    box-sizing: border-box;
    overflow-y: auto;
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

.search {
    width: 100%;
    height: 4vh;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    position: sticky;
    top: 0;
    z-index: 10;
}

.search input {
    width: 100%;
    height: 4vh;
    border-radius: 5px;
}

.search .icons {
    position: absolute;
    right: 0;
    width: 30px;
    height: 30px;
    margin-right: 5px;
}

.chatList-container h3 {
    text-align: center;
    height: 40px;
    line-height: 40px;
}

.new-friends {
    box-sizing: border-box;
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 2px;
    padding-left: 5px;
    cursor: pointer;
    margin-bottom: 10px;
}

.new-friends i {
    width: 30px;
    height: 30px;
    margin-right: 5px;
}

.new-friends strong {
    font-size: 16px;
}

.room-list {
    cursor: pointer;
    box-sizing: border-box;
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 2px;
    padding-left: 5px;
    margin-bottom: 10px;
}

.room-list div {
    margin-right: 5px;
}

.room-list img {
    width: 30px;
    height: 30px;
}

.right-info {
    height: 40px;
    /* 或者设定具体宽度 */
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 隐藏溢出部分 */
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
}

.right-info span {
    font-size: 12px;
}

.right-info strong {
    font-size: 16px;
}

.right-info span,
.right-info strong {
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 隐藏溢出部分 */
    text-overflow: ellipsis;
}

.active {
    background-color: #c3c4c4;
}

.hover:hover {
    background-color: #dedbda;
}
</style>