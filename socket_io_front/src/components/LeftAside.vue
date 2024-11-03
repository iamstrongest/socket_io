<script setup>
import { useRouter } from "vue-router";
import { useNotifyStore } from "@/stores/notify"
import { nextTick, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { socket } from "@/socket";
import { iconsAsideRoutes } from "@/config/constraint"
const router = useRouter();
const userStore = useUserStore();
const notifyStore = useNotifyStore()
const popupRef = ref();
const resizableRef = ref();
const resizerRef = ref();
function handleClicks(params, e) {
    const { route, iconId } = params;
    e.stopPropagation();
    if (iconId == 4) {
        togglePopup();
    }
    notifyStore.updateAsideActive(iconId)
    route && router.push(route);
}
const icons = iconsAsideRoutes;
function togglePopup() {
    nextTick(() => {
        if (popupRef.value[0]) {
            popupRef.value[0].style.display = popupRef.value[0].style.display === 'block' ? 'none' : 'block'
        }
    })
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
    if (newWidth > 50 && newWidth < 100) { // 最小宽度限制
        resizableRef.value.style.width = newWidth + 'px';
    }
}

function stopResize() {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
}
function selectOption(params) {
    let { route, iconId } = params;
    if (iconId == 9) {
        socket.emit('logout', { id: userStore.user.info.id, username: userStore.user.info.username })
        userStore.resetUserInfo();
        localStorage.removeItem('token');
    }
    if (iconId == 6) {
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
    <aside ref="resizableRef">
        <div class="resizer" ref="resizerRef" @mousedown="mousedownHandle"></div>
        <div>
            <div class="common hover" v-for="item of icons" :key="item.iconId"
                :class="{ active: notifyStore.asideActive == item.iconId, popover: item.iconId == 4 }"
                @click="(event) => handleClicks({ route: item.route, iconId: item.iconId }, event)" :title="item.title">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.class"></use>
                </svg>

                <div v-if="item.iconId == 4" ref="popupRef" class="more-action">
                    <div class="popup-item hover" v-for="item of icons[3].children" :title="item.title"
                    :key="item.iconId"
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
    padding: 1px;
    height: 95vh;
    flex-direction: column;
    align-items: center;
    z-index: 10;
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

aside .active {
    background-color: var(--aside_active__color);
}

aside .hover:hover {
    background-color: var(--aside_hover_color);
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
    /* 背景颜色 */
    background-color: var(--more_background_color);
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
    height: 180px;
    color: var(--more_font_color);
    ;
}

.more-action::before {
    position: absolute;
    content: "";
    top: 50%;
    left: -20px;
    border: 10px solid transparent;
    border-right-color: aqua;
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
    background-color: #ccc;
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