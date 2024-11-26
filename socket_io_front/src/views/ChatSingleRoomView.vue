<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 11:11:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-18 14:21:06
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\views\ChatSingleRoomView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onMounted, ref, computed, useTemplateRef, nextTick, onBeforeUnmount, watch, provide, inject } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { getChat } from "@/utils/api/chat"
import { useUserStore } from '@/stores/user';
import { useVideoStore } from '@/stores/video';
// import { socket } from "@/socket";
import { getSocket } from "@/socket";
import { throttle } from "@/utils/utilFn"
import { useChatStore } from '@/stores/chat'
const route = useRoute();
const userStore = useUserStore();
const chatStore = useChatStore();
const videoStore = useVideoStore();
const chatList = ref([]);
const chatMessageRef = ref();
const editableDivRef = ref();
const sendContainerRef = ref();
const sendBtnsRef = ref();
const page = ref(1);
const totalPage = ref();
provide('scrollFn', () => {
    nextTick(() => {
        if (chatMessageRef.value) {
            chatMessageRef.value.scrollTop = chatMessageRef.value.scrollHeight;
        }
    })
})
const video = inject("showVideo");
let offsetX, offsetY;
const icons = [
    { class: "#icon-biaoqing", id: 1, title: "表情包-暂未开发" },
    { class: "#icon-stationary_file", id: 2, title: "发送文件-暂未开发" },
    { class: "#icon-shipin", id: 3, title: "视频通话-待测试" },
    { class: "#icon-gengduox", id: 4, title: "更多-暂未开发" },
]
const isMove = ref(false);
watch(() => route.params.roomId, async (newValue, oldValue) => {
    chatStore.resetChatList();
    chatStore.updateActiveRoomId(newValue);
    page.value = 1;
    const params = { roomId: newValue, page: page.value };
    const data = await addData(params);
    chatStore.addAfterChat(data);
})
function handleClick() {
    if (isMove.value) {
        return;
    }
    const conment = editableDivRef.value.innerText.trim();
    if (conment.length === 0) {
        alert("发送内容不能为空");
        return;
    }
    const roomId = route.params.roomId;
    const sendId = userStore.user.info.id;
    const date = new Date();
    const updatedAt = date;
    const receiveId = parseInt(route.query.receiveId);
    const type = 1;
    const params = { roomId, sendId, conment, receiveId, type, updatedAt };
    const sendIdUsername = userStore.user.info.username;
    const sendIdAvatar = userStore.user.info.avatar;
    chatStore.addAfterChat({
        conment,
        roomId,
        sendId,
        receiveId,
        type,
        sendIdUsername,
        sendIdAvatar
    });
    chatStore.updateRoomList({ roomId, conment, updatedAt });
    const socket = getSocket();
    socket.emit("send_single_chat", params);
    nextTick(() => {
        editableDivRef.value.innerText = "";
        chatMessageRef.value.scrollTop = chatMessageRef.value.scrollHeight;
    })
}
async function addData(params) {
    const { data: resp } = await getChat(params);
    const { data } = resp;
    totalPage.value = Number(resp.totalPage);
    if (data.length == 0) {
        alert(resp.message);
    }
    if (page.value <= totalPage.value) {
        page.value++;
    }
    return data;
}
function iconHandleClick(id) {
    if (id === 3) {
        video.changeVideoStatus(true);
        const socket = getSocket();
        videoStore.createVidemoRoomId();
        const receiveId = parseInt(route.query.receiveId)
        videoStore.setVideoRoomReceiveId(receiveId);
        socket.emit("createRoom", {
            userId: userStore.user.info.id,
            username: userStore.user.info.username,
            receiveId,
            videoRoomId: videoStore.videoRoomId
        })
    }
}
async function callback(event) {
    if (event.target?.scrollTop < 10 && page.value > totalPage.value) {
        return alert("没有更多聊天信息了");
    }
    if (event.target?.scrollTop < 10 && page.value <= totalPage.value) {
        const roomId = route.params.roomId;
        const params = { roomId: roomId, page: page.value };
        const data = await addData(params);
        chatStore.addBeforeChat(data);
    }
}
const scrollFn = throttle(callback, 500);

onMounted(async () => {
    const roomId = route.params.roomId;
    chatStore.updateActiveRoomId(roomId);
    const params = { roomId: roomId, page: page.value };
    const data = await addData(params);
    chatList.value = data;
    chatStore.addAfterChat(data);
    nextTick(() => {
        if (chatMessageRef.value) {
            chatMessageRef.value.addEventListener("scroll", scrollFn);
            sendBtnsRef.value.addEventListener("mousedown", onMouseDown);
            chatMessageRef.value.scrollTop = chatMessageRef.value.scrollHeight;
        }
    })

})
function onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    offsetX = e.clientX - sendBtnsRef.value?.getBoundingClientRect().left;
    offsetY = e.clientY - sendBtnsRef.value?.getBoundingClientRect().top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}
function onMouseMove(e) {
    isMove.value = true;
    const parentRect = sendContainerRef.value?.getBoundingClientRect();
    let left = e.clientX - offsetX - parentRect.left;
    let top = e.clientY - offsetY - parentRect.top;
    // 限制在父元素内
    left = Math.max(0, Math.min(left, parentRect.width - sendBtnsRef.value?.offsetWidth));
    top = Math.max(0, Math.min(top, parentRect.height - sendBtnsRef.value?.offsetHeight));
    nextTick(() => {
        if (sendBtnsRef.value) {
            sendBtnsRef.value.style.left = `${left}px`;
            sendBtnsRef.value.style.top = `${top}px`;
        }
    })
}

function onMouseUp() {
    setTimeout(() => {
        isMove.value = false;
    }, 100)
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}
onBeforeUnmount(() => {
    chatMessageRef.value?.removeEventListener('scroll', handleClick);
    sendBtnsRef.value?.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
})

</script>
<template>
    <div class="chat-tontainer">
        <div class="chat-message" ref="chatMessageRef">
            <template v-for="item of chatStore.chatList" :key="item.roomId">
                <!-- 发送者不是自己 -->
                <div v-if="item.sendId != userStore.user.info.id" class="left-chat-info">
                    <div>
                        <img :src="item.sendIdAvatar" alt="头像">
                    </div>
                    <div class="chat-info-common">
                        <h3 :title="item.sendIdUsername">{{ item.sendIdUsername }}</h3>
                        <p class="conment" :title="item.conment">{{ item.conment }}</p>
                    </div>
                </div>
                <!-- 发送者是自己 -->
                <div v-else class="right-chat-info">
                    <div class="chat-info-common right-chat-info-div">
                        <h3 :title="item.sendIdUsername">{{ item.sendIdUsername }}</h3>
                        <p class="conment" :title="item.conment">{{ item.conment }}</p>
                    </div>
                    <div>
                        <img :src="item.sendIdAvatar" alt="头像">
                    </div>
                </div>
            </template>
        </div>
        <div class="send-container" ref="sendContainerRef">
            <div class="icons-containers">
                <div class="icons" v-for="icon in icons" :key="icon.id" :title="icon.title" @click="iconHandleClick(icon.id)">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="icon.class"></use>
                    </svg>
                </div>
            </div>
            <div class="input-tontainer" contenteditable="true" ref="editableDivRef" @keydown.enter="handleClick">

            </div>
            <div class="send-btns .tuozhuai" ref="sendBtnsRef" @click="handleClick" title="可在输入框内拖拽">
                <div class="svg">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fasong"></use>
                    </svg>
                </div>
                <button type="button">发送</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-tontainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    color: var(--chat_talk_font_color);
    background-image: var(--chat_background_img);
    background-position: center;
    background-size: cover;
    /* border-left: 1px solid #000; */
}

.chat-message {
    height: 70vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}


.right-chat-info,
.left-chat-info {
    display: flex;
    flex-direction: row;
    padding: 20px;
}

.chat-info-common {
    margin: 10px;
}

img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

p {
    max-width: 300px;
    border-radius: 5px;
    border: 3px solid #fff;
    border-color: var(--chat_talk_border_color);
    background-color: var(--chat_talk_background_color);
}

h3 {
    max-width: 150px;
    height: 30px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--chat_talk_h3_color);
}

.right-chat-info {
    align-self: flex-end;
}

.right-chat-info-div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.icons-containers {
    display: flex;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
}

.send-container {
    flex: 1;
    position: relative;
    border-top: 2px solid #ccc;
    color: var(--send——container_font_color);
    background-color: var(--send——container_background_color);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    /* overflow-x: hidden; */
}

.icons {
    width: 30px;
    height: 30px;
    margin-right: 20px;
    cursor: pointer;
}

.input-tontainer {
    flex: 1;
}

.send-btns {
    width: 100px;
    height: 50px;
    border-radius: 5px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 2%;
    bottom: 8%;
    background-color: #d2d2d2;
    cursor: pointer;
}

.svg {
    width: 30px;
    height: 30px;
    margin-right: 5px;
}

button {
    border: 0;
    font-size: 20px;
    background-color: transparent;
    color: #41b87a;
    cursor: pointer;
}

.conment {
    height: auto;
}
</style>