<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 11:11:57
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 14:33:45
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\views\ChatSingleRoomView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onMounted, ref, computed, useTemplateRef, nextTick, onBeforeUnmount, watch } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { getChat } from "@/utils/api/chat"
import { useUserStore } from '@/stores/user';
import { socket } from "@/utils/socket";
import { throttle } from "@/utils/utilFn"
import { useChatStore } from '@/stores/chat'
const route = useRoute();
const userStore = useUserStore();
const chatStore = useChatStore();
const chatList = ref([]);
const chatMessageRef = useTemplateRef('chatMessage');
const editableRef = useTemplateRef('editableDiv');
const sendContainerRef = useTemplateRef('sendContainer');
const sendBtnsRef = useTemplateRef('sendBtns');
const page = ref(1);
const totalPage = ref();
let offsetX, offsetY;
const icons = [
    { class: "#icon-biaoqing", id: 1, title: "表情包" },
    { class: "#icon-stationary_file", id: 2, title: "发送文件" },
    { class: "#icon-shipin", id: 3, title: "视频通话" },
    { class: "#icon-gengduox", id: 4, title: "更多" },
]
const isMove = ref(false);
// watch(() => route.params.roomId, async (newValue, oldValue) => {
//     console.log(`newValue------>`, newValue);
//     // console.log(`chatStore.activeRoomId------>`, chatStore.activeRoomId);
//     // console.log(chatStore.activeRoomId !== newValue);
//     console.log(oldValue);

//     console.log(newValue.roomId !== oldValue);

//     if (newValue !== oldValue) {
//         page.value = 1;
//         const params = { roomId: newValue, page: page.value };
//         const data = await addData(params);
//         chatList.value = data;
//     }
// })
watch(() => route.params.roomId, async (newValue, oldValue) => {
    chatList.value = [];
    page.value = 1;
    const params = { roomId: newValue, page: page.value };
    const data = await addData(params);
    chatList.value = data;
})
function handleClick() {
    if (isMove.value) {
        return;
    }
    const conment = editableRef.value.innerHTML.trim();
    if (conment.length === 0) {
        alert("发送内容不能为空");
        return;
    }
    const roomId = route.params.roomId;
    const sendId = userStore.user.info.id;
    chatStore.updateRoomList({ roomId, conment });
    const receiveId = parseInt(route.query.receiveId);
    const type = 1;
    const params = { roomId, sendId, conment, receiveId, type };
    const sendIdUsername = userStore.user.info.username;
    const sendIdAvatar = userStore.user.info.avatar;
    chatList.value.push({
        conment,
        roomId,
        sendId,
        receiveId,
        type,
        sendIdUsername,
        sendIdAvatar
    });
    nextTick(() => {
        chatMessageRef.value.scrollTop = chatMessageRef.value.scrollHeight;
    })
    socket.emit("send_chat", params);
    editableRef.value.innerHTML = "";
}
async function addData(params) {
    const { data: resp } = await getChat(params);
    const { data } = resp;
    totalPage.value = resp.totalPage;
    if (data.length == 0) {
        alert(resp.message);
    }
    if (page.value < totalPage.value) {
        page.value++;
    }
    return data;
}
async function callback(event) {
    if (event.target.scrollTop < 10) {
        const roomId = route.params.roomId;
        const params = { roomId: roomId, page: page.value };
        const data = await addData(params);
        chatList.value.unshift(...data);
    }
}
const scrollFn = throttle(callback, 500);

onMounted(async () => {
    const roomId = route.params.roomId;
    const params = { roomId: roomId, page: page.value };
    const data = await addData(params);
    chatList.value = data;
    socket.on("receive", (data) => {
        chatList.value.push(data);
        chatStore.updateRoomList({ roomId, conment: data.conment });
        nextTick(() => {
            chatMessageRef.value.scrollTop = chatMessageRef.value.scrollHeight;
        })
    });
    nextTick(() => {
        chatMessageRef.value.scrollTop = chatMessageRef.value.scrollHeight;
    })
    chatMessageRef.value.addEventListener("scroll", scrollFn);
    sendBtnsRef.value.addEventListener("mousedown", onMouseDown);
})
function onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    offsetX = e.clientX - sendBtnsRef.value.getBoundingClientRect().left;
    offsetY = e.clientY - sendBtnsRef.value.getBoundingClientRect().top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}
function onMouseMove(e) {
    isMove.value = true;
    const parentRect = sendContainerRef.value.getBoundingClientRect();
    let left = e.clientX - offsetX - parentRect.left;
    let top = e.clientY - offsetY - parentRect.top;
    // 限制在父元素内
    left = Math.max(0, Math.min(left, parentRect.width - sendBtnsRef.value.offsetWidth));
    top = Math.max(0, Math.min(top, parentRect.height - sendBtnsRef.value.offsetHeight));
    sendBtnsRef.value.style.left = `${left}px`;
    sendBtnsRef.value.style.top = `${top}px`;
}

function onMouseUp() {
    setTimeout(() => {
        isMove.value = false;
    }, 100)
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}
onBeforeUnmount(() => {
    chatMessageRef.value.removeEventListener('scroll', handleClick);
    sendBtnsRef.value.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
})

</script>
<template>
    <div class="chat-tontainer">
        <div class="chat-message" ref="chatMessage" v-if="chatList.length > 0">
            <template v-for="item of chatList" :key="item.id">
                <!-- 发送者不是自己 -->
                <div v-if="item.sendId != userStore.user.info.id" class="left-chat-info">
                    <div>
                        <img :src="item.sendIdAvatar" alt="头像">
                    </div>
                    <div class="chat-info-common">
                        <h3>{{ item.sendIdUsername }}</h3>
                        <p class="conment" :title="item.conment">{{ item.conment }}</p>
                    </div>
                </div>
                <!-- 发送者是自己 -->
                <div v-else class="right-chat-info">
                    <div class="chat-info-common right-chat-info-div">
                        <h3>{{ item.sendIdUsername }}</h3>
                        <p class="conment" :title="item.conment">{{ item.conment }}</p>
                    </div>
                    <div>
                        <img :src="item.sendIdAvatar" alt="头像">
                    </div>
                </div>
            </template>
        </div>
        <div class="send-container" ref="sendContainer">
            <div class="icons-containers">
                <div class="icons" v-for="icon in icons" :key="icon.id" title="功能未开发">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="icon.class"></use>
                    </svg>
                </div>
            </div>
            <div class="input-tontainer" contenteditable="true" ref="editableDiv" @keydown.enter="handleClick">

            </div>
            <div class="send-btns .tuozhuai" ref="sendBtns" @click="handleClick" title="可在输入框内拖拽">
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
    border-left: 1px solid #000;
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

h3 {
    max-width: 150px;
    height: 30px;
    margin-bottom: 5px;
}

p {
    max-width: 300px;
    border-radius: 5px;
    border: 3px solid #fff;
    background-color: skyblue;
    color: white;
}

h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    background-color: #fff;
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