<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 14:23:48
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-26 23:31:29
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\src\views\LayoutView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onBeforeMount, onMounted, watch, onUnmounted, provide, ref, nextTick } from 'vue';
import { useUserStore } from "@/stores/user.js"
import { useNotifyStore } from "@/stores/notify";
import { useChatStore } from '@/stores/chat';
import { useVideoStore } from '@/stores/video';
import { RouterView } from 'vue-router';
import LeftAside from "@/components/LeftAside.vue"
import { getSocket } from "@/socket";
import { requestPermission } from "@/utils/notification"
import Footer from "@/components/Footer.vue"
import Video from "@/components/Video.vue"
import VideoMask from '@/components/VideoMask.vue';
const notifyStore = useNotifyStore();
const userStore = useUserStore();
const chatStore = useChatStore();
const videoStore = useVideoStore();
const showVideoBtns = ref(false);
const showVideo = ref(false);
const video_btns = ref(null);
const isSelf = ref(false);
let offsetX, offsetY;
provide("showVideoBtns", {
    showVideoBtns,
    changeVideoBtnsStatus
})
provide("showVideo", {
    showVideo,
    changeVideoStatus
})
function changeVideoBtnsStatus(status, flag = false) {
    showVideoBtns.value = status;
    if (status == true) {
        isSelf.value = flag;
    }
}
function changeVideoStatus(status) {
    showVideo.value = status;
}
function agreeClick() {
    changeVideoStatus(true);
    changeVideoBtnsStatus(false);
    const socket = getSocket();
    videoStore.setIsReceived(true);
    socket.emit("peer_join", {
        userId: userStore.user.info.id,
        username: userStore.user.info.username,
        videoRoomId: videoStore.videoRoomId
    })
}
function rejectClick() {
    changeVideoBtnsStatus(false);
    const socket = getSocket();
    socket.emit("reject", {
        username: userStore.user.info.username,
        videoRoomId: videoStore.videoRoomId
    })
}
function onMouseDown(e) {
    e.stopPropagation();
    offsetX = e.clientX - video_btns.value?.getBoundingClientRect().left;//鼠标距离元素内部的左边距离
    offsetY = e.clientY - video_btns.value?.getBoundingClientRect().top;//鼠标距离元素内部的顶部距离
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}
function onMouseMove(e) {
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;
    nextTick(() => {
        if (e.target) {
            video_btns.value.style.left = `${left}px`;
            video_btns.value.style.top = `${top}px`;
        }
    })
}
function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}
// const scrollFn = inject('scrollFn');
// 发送通知
function sendNotification(data) {

    let title = '';
    switch (data.type) {
        case 1:
            title = "系统通知"
            break;
        case 2:
            title = "好友申请"
            break;
        case 3:
            title = "申请反馈"
            break;
        case 4:
            title = "邀请视频通话"
            break;
        case 5:
            title = "拒绝视频通话"
            break;
    }
    const notification = new Notification(title, {
        body: data.conment,
        icon: "../assets/img/info.jpg" // 可选，图标路径
    });

    notification.onclick = () => {
        window.focus(); // 点击通知时使窗口获得焦点
    };
}
function logout(socket) {
    socket.emit('logout', { id: userStore.user.info.id, username: userStore.user.info.username });
}

function groupReceive(data) {
    if (chatStore.activeRoomId === data.roomId) {
        chatStore.addAfterChat(data);
        if (data.deleteId) {
            chatStore.deleteGroupRoomUserFn(data.deleteId);
        }
        if (data.addUser) {
            chatStore.addUserAfter(data);
        }
    }
    chatStore.updateRoomList({ roomId: data.roomId, conment: data.conment, updatedAt: data.updatedAt });
}
function singleReceive(data) {
    if (chatStore.activeRoomId === data.roomId) {
        chatStore.addAfterChat(data);
    }
    chatStore.updateRoomList({ roomId: data.roomId, conment: data.conment, updatedAt: data.updatedAt });
}
function friendLogin(data) {
    const notification = new Notification("好友上线通知", {
        body: data.msg,
        icon: '@/assets/img/info.jpg' // 可选，图标路径
    });
    notification.onclick = () => {
        window.focus(); // 点击通知时使窗口获得焦点
    };
}
function friendLogout(data) {
    const notification = new Notification("好友下线通知", {
        body: data.msg,
        icon: '@/assets/img/info.jpg' // 可选，图标路径
    });
    notification.onclick = () => {
        window.focus(); // 点击通知时使窗口获得焦点
    };
}
function receiveNotify(data) {
    notifyStore.addNotifiy(data);
    if (Notification.permission === "granted") {
        sendNotification(data);
    } else {
        requestPermission(); // 请求权限
    }
}
function createRoomRequest(data) {
    changeVideoBtnsStatus(true);
    videoStore.videoRoomId = data.videoRoomId;
    videoStore.sendId = data.userId;
    if (Notification.permission === "granted") {
        sendNotification(data);
    } else {
        requestPermission(); // 请求权限
    }
}
function rejectJoinRoom(data) {
    changeVideoBtnsStatus(false);
    changeVideoStatus(false);
    if (Notification.permission === "granted") {
        sendNotification(data);
    } else {
        requestPermission(); // 请求权限
    }
}

watch(() => userStore.user?.info?.theme, (newValue, oldValue) => {
    if (newValue) {
        window.document.documentElement.setAttribute('data-theme', newValue);
    }
})
onBeforeMount(async () => {
    await userStore.setUserInfo();
    await notifyStore.setNotifiy();
})
onMounted(async () => {
    window.document.documentElement.setAttribute('data-theme', userStore.user.info.theme || 'light')
    // window.addEventListener("beforeunload", logout);//刷新或者直接退出浏览器，可以给提示
    const socket = getSocket();
    socket.on("friend_login", friendLogin);
    socket.on("friend_logout", friendLogout);
    socket.on("disconnect", () => {
        console.log("断开连接");
    });
    window.onload = () => {
        if (Notification.permission !== "granted") {
            requestPermission();
        }
    };
    // 信息通知
    socket.on('receive_notify', receiveNotify)
    // 用户私聊
    socket.on("single_receive", singleReceive);
    // 用户群聊
    socket.on("group_receive", groupReceive);

    //视频相关通话
    socket.on("create_room_request", createRoomRequest);
    socket.on("reject_join_room", rejectJoinRoom);
});
onUnmounted(() => {
    userStore.resetUserInfo();
})
</script>
<template>
    <main v-if="userStore?.user?.info?.id">
        <LeftAside></LeftAside>
        <div class="rightAise">
            <RouterView></RouterView>
        </div>
    </main>
    <div class="video_btns" id="video_btns" ref="video_btns" v-if="showVideoBtns && !isSelf" @mousedown="onMouseDown">
        <div class="svg" @click="agreeClick">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tonghuazhong"></use>
            </svg>
        </div>
        <div class="svg" @click="rejectClick">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jujuetonghua"></use>
            </svg>
        </div>
    </div>
    <VideoMask class="z_index" v-model="showVideo">
        <Video></Video>
    </VideoMask>
    <!-- <Footer></Footer> -->
</template>

<style scoped>
main {
    display: flex;
}

.rightAise {
    width: 100%;
    display: flex;
}

.video_container {
    width: 100%;
    height: 100vh;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.video_btns {
    cursor: move;
    position: fixed;
    right: 2%;
    bottom: 2%;
    width: 240px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #ccc;
    border-radius: 20px;
    background: linear-gradient(to right, #000000, #808080, #FFFFFF);
}

.svg {
    width: 40px;
    height: 40px;
    cursor: pointer;
    animation: up_down 2s infinite;
}

.z_index {
    z-index: 10;
}

@keyframes up_down {
    0% {
        transform: translateY(0px) translateX(0px);
    }

    50% {
        transform: translateY(10px) translateX(10px);
    }

    100% {
        transform: translateY(-10px) translateX(-10px);
    }
}
</style>