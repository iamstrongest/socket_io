<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 14:23:48
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-09 11:19:07
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\src\views\LayoutView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onBeforeMount, onMounted, watch, onUnmounted, inject } from 'vue';
import { useUserStore } from "@/stores/user.js"
import { useNotifyStore } from "@/stores/notify";
import { useChatStore } from '@/stores/chat';
import { RouterView } from 'vue-router';
import LeftAside from "@/components/LeftAside.vue"
import { getSocket } from "@/socket";
import { requestPermission } from "@/utils/notification"
import Footer from "@/components/Footer.vue"
const notifyStore = useNotifyStore();
const userStore = useUserStore();
const chatStore = useChatStore();
// const scrollFn = inject('scrollFn');
// 请求权限
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
onBeforeMount(async () => {
    await userStore.setUserInfo();
    await notifyStore.setNotifiy();
})
watch(() => userStore.user?.info?.theme, (newValue, oldValue) => {
    if (newValue) {
        window.document.documentElement.setAttribute('data-theme', newValue);
    }
})
onMounted(async () => {
    window.document.documentElement.setAttribute('data-theme', userStore.user.info.theme || 'light')
    // window.addEventListener("beforeunload", logout);//刷新或者直接退出浏览器，可以给提示
    const socket = getSocket();
    socket.on("friend_login", (data) => {
        const notification = new Notification("好友上线通知", {
            body: data.msg,
            icon: '@/assets/img/info.jpg' // 可选，图标路径
        });
        notification.onclick = () => {
            window.focus(); // 点击通知时使窗口获得焦点
        };
    });
    socket.on("friend_logout", (data) => {
        const notification = new Notification("好友下线通知", {
            body: data.msg,
            icon: '@/assets/img/info.jpg' // 可选，图标路径
        });
        notification.onclick = () => {
            window.focus(); // 点击通知时使窗口获得焦点
        };
    });
    socket.on("disconnect", () => {
        console.log("断开连接");
    });
    window.onload = () => {
        if (Notification.permission !== "granted") {
            requestPermission();
        }
    };
    socket.on('receive_notify', (data) => {
        notifyStore.addNotifiy(data);
        if (Notification.permission === "granted") {
            sendNotification(data);
        } else {
            requestPermission(); // 请求权限
        }
        // tonePlayerRef.value.playTone()
    })
    socket.on("single_receive", (data) => {
        if (chatStore.activeRoomId === data.roomId) {
            chatStore.addAfterChat(data);
        }
        chatStore.updateRoomList({ roomId: data.roomId, conment: data.conment, updatedAt: data.updatedAt });
    });
    socket.on("group_receive", (data) => {
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
    });
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
    <Footer></Footer>
</template>

<style scoped>
main {
    display: flex;
}

.rightAise {
    width: 100%;
    display: flex;
}
</style>