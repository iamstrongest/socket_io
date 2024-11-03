<script setup>
import { onMounted, ref, nextTick, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    insertGroupRoomUser,
    getGroupRoomChatList,
    getGroupRoom,
    getGroupRoomUser,
    getGroupUserIdentity,
    updateGroupUserIdentity,
    deleteGroupUser
} from "@/utils/api/group_chat"
import { useUserStore } from '@/stores/user';
import { socket } from "@/socket";
import { throttle } from "@/utils/utilFn"
import { useChatStore } from '@/stores/chat'
import NoData from "@/components/NoData.vue"
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const chatStore = useChatStore();
const chatMessageRef = ref();
const editableDivRef = ref();
const sendContainerRef = ref();
const sendBtnsRef = ref();
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
const roomInfo = ref({});
const roomUserList = ref([]);
const showUserList = ref([]);
const customMenuRef = ref();
const activeId = ref('');
const userIdentityRoom = ref();
const searchText = ref('');
watch(searchText, (newValue, oldValue) => {
    if (newValue.length === 0) {
        showUserList.value = roomUserList.value;
    } else {
        showUserList.value = roomUserList.value.filter(user => user.username.indexOf(newValue) !== -1);
    }
})
watch(() => route.params.roomId, async (newValue, oldValue) => {
    chatStore.resetChatList();
    chatStore.updateActiveRoomId(newValue);
    const roomParams = { roomId: newValue };
    const { data: resp } = await getGroupRoom(roomParams);
    roomInfo.value = resp.data;
    const { data: response } = await getGroupRoomUser(roomParams);
    roomUserList.value = response.data;
    showUserList.value = response.data;
    const userIdentityParams = {
        roomId: newValue,
        joinId: userStore.user.info.id
    }
    const { data: responseData } = await getGroupUserIdentity(userIdentityParams)
    userIdentityRoom.value = responseData.data.identity;
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
    chatStore.updateRoomList({ roomId, conment, createdAt: date });
    const receiveId = parseInt(route.query.receiveId);
    const type = 1;
    const sendIdUsername = userStore.user.info.username;
    const sendIdAvatar = userStore.user.info.avatar;
    const params = { roomId, sendId, conment, receiveId, type, sendIdUsername, sendIdAvatar };
    chatStore.addAfterChat({
        conment,
        roomId,
        sendId,
        receiveId,
        type,
        sendIdUsername,
        sendIdAvatar
    });
    socket.emit("send_group_chat", params);
    nextTick(() => {
        editableDivRef.value.innerText = "";
        chatMessageRef.value.scrollTop = chatMessageRef.value.scrollHeight;
    })
}
async function addData(params) {
    const { data: resp } = await getGroupRoomChatList(params);
    const { data } = resp;
    totalPage.value = resp.totalPage;
    if (page.value < totalPage.value) {
        page.value++;
    }
    return data;
}
async function callback(event) {
    if (event.target?.scrollTop < 10) {
        const roomId = route.params.roomId;
        const params = { roomId: roomId, page: page.value };
        const data = await addData(params);
        chatStore.addBeforeChat(data);
    }
}
const scrollFn = throttle(callback, 500);
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
function menuFn(event, id) {
    activeId.value = id;
    event.preventDefault();
    console.log(customMenuRef.value);
    if (customMenuRef.value && customMenuRef.value[0]) {
        customMenuRef.value[0].style.display = 'block';
        customMenuRef.value[0].style.left = `0px`;
        customMenuRef.value[0].style.top = `${event.pageY}px`;
    }
}
async function clickHandle(event, params) {
    event.stopPropagation();
    const data = {
        roomId: params.roomId, joinId: params.joinId,
    }
    if (params.methodId === 1) {
        data.identity = 2;
        documentClickFn();
        const { data: resp } = await updateGroupUserIdentity(data);
        if (resp.code !== 200) {
            alert(resp.message);
        }
        roomUserList.value.forEach(item => {
            if (item.joinId === params.joinId) {
                item.identity = 2;
            }
        })
        return;
    }
    if (params.methodId === 2) {
        data.identity = 3;
        const { data: resp } = await updateGroupUserIdentity(data);
        if (resp.code !== 200) {
            alert(resp.message);
        }
        roomUserList.value.forEach(item => {
            if (item.joinId === params.joinId) {
                item.identity = 3;
            }
        })
        return;
    }
    if (params.methodId === 3) {
        let indexOf;
        const { data: resp } = await deleteGroupUser(data);
        if (resp.code !== 200) {
            alert(resp.message);
        }
        indexOf = roomUserList.value.indexOf((item) => item.joinId === params.joinId);
        roomUserList.value.splice(indexOf, 1);
        return;
    }
    if (params.methodId === 4) {
        router.push(`/user?id=${params.joinId}`)
    }
}
function documentClickFn(e) {
    if (customMenuRef.value && customMenuRef.value[0]) {
        customMenuRef.value[0].style.display = 'none'; // 点击后隐藏菜单
    }
    // activeId.value = '';
}
onMounted(async () => {
    const roomId = route.params.roomId;
    chatStore.updateActiveRoomId(roomId);
    const roomParams = { roomId: roomId };
    const { data: resp } = await getGroupRoom(roomParams);
    roomInfo.value = resp.data;
    const { data: response } = await getGroupRoomUser(roomParams);
    roomUserList.value = response.data;
    showUserList.value = response.data;
    const userIdentityParams = {
        roomId,
        joinId: userStore.user.info.id
    }
    const { data: responseData } = await getGroupUserIdentity(userIdentityParams)
    userIdentityRoom.value = responseData.data.identity;
    const params = { roomId: roomId, page: page.value };
    const data = await addData(params);
    chatStore.addAfterChat(data);
    document.addEventListener("click", documentClickFn);
    nextTick(() => {
        if (chatMessageRef.value) {
            chatMessageRef.value.addEventListener("scroll", scrollFn);
            sendBtnsRef.value.addEventListener("mousedown", onMouseDown);
            chatMessageRef.value.scrollTop = chatMessageRef.value.scrollHeight;
        }
    })

})
onBeforeUnmount(() => {
    chatMessageRef.value?.removeEventListener('scroll', handleClick);
    sendBtnsRef.value?.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
})

</script>
<template>
    <div class="chat-tontainer">
        <div class="chat-tontainer-top">
            <span>群聊名称:{{ roomInfo.roomName }}</span>
            <span>群号:{{ roomInfo.roomId }}</span>
        </div>
        <div class="chat-message" ref="chatMessageRef">
            <template v-for="item of chatStore.chatList" :key="item.roomId">
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
        <div class="send-container" ref="sendContainerRef">
            <div class="icons-containers">
                <div class="icons" v-for="icon in icons" :key="icon.id" title="功能未开发">
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
    <div class="group-user-tontainer">
        <template v-if="roomUserList.length > 0">
            <div class="search">
                <input type="text" name="search" id="search" placeholder="输入昵称" v-model="searchText">
                <div class="icons">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo"></use>
                    </svg>
                </div>
            </div>
            <div class="group-user-info-tontainer" v-for=" user in showUserList" :key="user.id"
                @contextmenu="(event) => menuFn(event, user.joinId)">
                <img :src="user.avatar" alt="用户头像">
                <div class="group-user-info-tontainer-right">
                    <span class="username" :title="user.username">{{ user.username }}</span>
                    <!-- 1为群主 2为管理员 3为普通群众 -->
                    <span v-if="user.identity !== 3"
                        :class="{ leader: user.identity === 1, manager: user.identity === 2 }" class="auth">
                        {{ user.identity === 1 ? '群主' : '管理员' }}
                    </span>
                </div>
                <div v-if="activeId == user.joinId" ref="customMenuRef" id="customMenu">
                    <ul>
                        <li v-if="user.identity === 3 && userIdentityRoom === 1" @click="(event) => clickHandle(
                            event,
                            {
                                id: userStore.user.info.id,
                                ...user,
                                methodId: 1,
                            }
                        )">
                            <span>添加管理员</span>
                        </li>
                        <li v-if="user.identity === 2 && userIdentityRoom === 1" @click="(event) => clickHandle(
                            event,
                            {
                                id: userStore.user.info.id,
                                ...user,
                                methodId: 2,
                            }
                        )">
                            <span>取消管理员</span>
                        </li>
                        <li v-if="user.identity === 3 && (userIdentityRoom === 1 || userIdentityRoom === 2)" @click="(event) => clickHandle(
                            event,
                            {
                                id: userStore.user.info.id,
                                ...user,
                                methodId: 3,
                            }
                        )">
                            <span>删除群员</span>
                        </li>
                        <li @click="(event) => clickHandle(
                            event,
                            {
                                id: userStore.user.info.id,
                                ...user,
                                methodId: 4,
                            }
                        )">
                            <span>查看资料</span>
                        </li>
                    </ul>
                </div>
            </div>
        </template>
        <NoData v-else class="no-data">
        </NoData>
    </div>
</template>

<style scoped>
.chat-tontainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    color: var(--chat_talk_font_color);
    /* border-left: 1px solid #000; */
}

.chat-tontainer-top {
    height: 4vh;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    background-color: var(--chat_talk_top_background_color);
    color: var(--chat_talk_top__color);
}

.chat-tontainer-top span {
    margin-right: 10px;
}

.group-user-tontainer {
    width: 200px;
    height: 95vh;
    display: flex;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: var(--chat_talk_user_background_color);
    border-left: 1px solid var(--chat_talk_user_border_color);
    color: var(--chat_talk_user__color);

    flex-direction: column;
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: 5px;
}

.group-user-tontainer .search {
    width: 100%;
    height: 4vh;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
}

.group-user-tontainer .search input {
    width: 100%;
    height: 4vh;
    border-radius: 5px;
}

.group-user-tontainer .search .icons {
    position: absolute;
    right: 0;
    margin-right: 5px;
    cursor: default;
}

.group-user-tontainer div {
    height: 50px;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    align-items: center;
}

.group-user-tontainer div img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
}

.group-user-info-tontainer {
    position: relative;
}

.group-user-info-tontainer-right {
    flex: 1;
    /* display: flex; */
    justify-content: space-between;
    cursor: pointer;
}

.group-user-tontainer div .auth {
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    margin-right: 5px;
}

#customMenu {
    display: none;
    display: flex;
    flex-direction: column;
    position: absolute;
    background: white;
    height: auto;
    border-radius: 5px;
    background-color: var(--chat_talk_user_menu_background__color);
    color: var(--chat_talk_user_menu___color);
    border: 1px solid #ccc;
    z-index: 1000;
}

#customMenu ul {
    list-style: none;
    padding: 10px;
    margin: 0;
}

#customMenu li {
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    text-align: center;
    justify-content: center;
}

#customMenu li span {
    height: 30px;
    line-height: 30px;
}

#customMenu li:hover {
    background: #656565;
    /* 悬停效果 */
}

.leader {
    background-color: #e3d3cd;
    color: #fc9862;
}

.manager {
    background-color: #add6f7;
    color: #0299ff;
}

.group-user-tontainer div .username {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}

.chat-message {
    height: 66vh;
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

.no-data {
    flex: 1;
}
</style>