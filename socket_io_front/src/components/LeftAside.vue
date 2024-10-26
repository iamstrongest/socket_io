<script setup>
import { useRouter } from "vue-router";
import { useNotifyStore } from "@/stores/notify"
import { nextTick, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { socket } from "@/utils/socket";
const router = useRouter();
const userStore = useUserStore();
const notifyStore = useNotifyStore()
const popupRef = ref();
function handleClicks(params, e) {
    const { route, id } = params;
    e.stopPropagation();
    if (id == 4) {
        togglePopup();
    }
    notifyStore.updateAsideActive(id)
    route && router.push(route);
}
const icons = [
    { class: "#icon-tongzhi", route: "/notify", id: 1, title: "系统通知" },
    { class: "#icon-liaotian", route: "/chat", id: 2, title: "聊天记录" },
    { class: "#icon-haoyouliebiao", route: "/friend", id: 3, title: "好友列表" },
    {
        class: "#icon-gengduox", id: 4, title: "更多", children: [
            { class: "#icon-tianjiahaoyou", route: "/addfriend", id: 5, title: "添加好友" },
            { class: "#icon-gerenzhongxin", route: "/user", id: 6, title: "个人信息" },
            { class: "#icon-suoyouren", route: "/alluser", id: 7, title: "注册列表" },
            { class: "#icon-tuichu", id: 8, route: "/login", title: "退出登录" },
        ]
    },
]
function togglePopup() {
    nextTick(() => {
        if (popupRef.value[0]) {
            popupRef.value[0].style.display = popupRef.value[0].style.display === 'block' ? 'none' : 'block'
        }
    })
}

function selectOption(params) {
    let { route, id } = params;
    if (id == 8) {
        socket.emit('logout', { id: userStore.user.info.id, username: userStore.user.info.username })
        userStore.resetUserInfo();
        localStorage.removeItem('token');
    }
    if (id == 6) {
        route = `${route}?id=${userStore.user.info.id}`;
    }
    nextTick(() => {
        if (popupRef.value[0]) {
            popupRef.value[0].style.display = 'none'; // 选择后隐藏弹出框
        }
    });
    route && router.push(route);
}

// 点击弹出框外部时关闭弹出框
window.onclick = function (event) {
    nextTick(() => {
        if (popupRef.value[0]) {
            popupRef.value[0].style.display = 'none';
        }
    })
};
</script>
<template>
    <aside>
        <div :class="{ active: notifyStore.asideActive == item.id, popover: item.id == 4 }" class="common hover"
            v-for="item of icons" :key="item.id"
            @click="(event) => handleClicks({ route: item.route, id: item.id }, event)" :title="item.title">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.class"></use>
            </svg>

            <div v-if="item.id == 4" ref="popupRef" class="more-action">
                <div class="popup-item hover" v-for="item of icons[3].children" :title="item.title"
                    @click="selectOption(item)">
                    <div class="inner">
                        <div class="more_icon">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.class"></use>
                            </svg>
                        </div>
                        <span>{{ item.title }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="notify" v-if="notifyStore.notify.unreadNum">
            <div class="notify-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-hongdian"></use>
                </svg>
            </div>
            <span>{{ notifyStore.notify.unreadNum }}</span>
        </div>
    </aside>
</template>
<style scoped>
aside {
    width: 50px;
    display: flex;
    position: relative;
    box-sizing: border-box;
    height: 100vh;
    background-color: #2e2e2e;
    flex-direction: column;
    align-items: center;
}

.notify {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 20px;
    right: -30px;
}

.notify span {
    position: absolute;
    top: 0px;
    right: 32px;
    font-size: 16px;
}

.notify {
    color: #fff;
}

.notify-icon {
    width: 25px;
    height: 25px;
}

aside .common {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 30px 0;
}

aside div svg use {
    font-size: 40px;
}

.active {
    background-color: #c3c4c4;
}

.hover:hover {
    background-color: #dedbda;
}

.popover {
    position: relative;
}

.more-action {
    display: none;
    /* 默认隐藏弹出框 */
    position: absolute;
    /* 在按钮下面 */
    left: 45px;
    /* 确保左对齐 */
    background-color: #fff;
    /* 背景颜色 */
    border: 1px solid #ccc;
    /* 边框 */
    border-radius: 4px;
    /* 圆角 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    /* z-index: 1; */
    /* 确保在其他元素上方 */
    min-width: 150px;
    /* 最小宽度 */
    height: 150px;
}

.popup-item {
    height: 30px;
    width: 150px;
    box-sizing: border-box;
    text-align: center;
    padding: 0 15px;
    margin-top: 5px;
    /* 选项内边距 */
    cursor: pointer;
    /* 鼠标悬停时的指针效果 */
}

.popup-item:hover {
    background-color: #f0f0f0;
    /* 悬停时的背景颜色 */
}

.inner {
    display: flex;
    justify-content: space-around;
}

.more_icon {
    width: 30px;
    height: 30px;
}
</style>