<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 14:23:48
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-25 16:03:29
 * @FilePath: \Vue\Vue3\IM\socket_io\socket_io_front\src\views\LayoutView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { useUserStore } from "@/stores/user.js"
import { useNotifyStore } from "@/stores/notify";
import { RouterView } from 'vue-router';
import LeftAside from "@/components/LeftAside.vue"
import { socket } from "@/utils/socket";
import { requestPermission } from "@/utils/notification"
const notifyStore = useNotifyStore();
const userStore = useUserStore();
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
onBeforeMount(async () => {
    await userStore.setUserInfo();
    await notifyStore.setNotifiy();
})

onMounted(() => {

    socket.on("friend_login", (data) => {
        const notification = new Notification("好友上线通知", {
            body: data.msg,
            icon: "../assets/img/info.jpg" // 可选，图标路径
        });
        notification.onclick = () => {
            window.focus(); // 点击通知时使窗口获得焦点
        };
        console.log(data.msg);
    });
    socket.on("friend_logout", (data) => {
        const notification = new Notification("好友下线通知", {
            body: data.msg,
            icon: "../assets/img/info.jpg" // 可选，图标路径
        });
        notification.onclick = () => {
            window.focus(); // 点击通知时使窗口获得焦点
        };
        console.log(data.msg);
    });
    socket.on("disconnect", () => {
        console.log(socket.connected); // false
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
});
</script>
<template>
    <main v-if="userStore?.user?.info?.id">
        <LeftAside></LeftAside>
        <div class="rightAise">
            <RouterView></RouterView>
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
}

.rightAise {
    width: 100%;
}
</style>