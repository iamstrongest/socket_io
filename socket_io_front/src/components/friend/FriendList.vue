<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 20:46:52
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-09 10:07:54
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\components\friend\FriendList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onBeforeMount, ref, onMounted, onUnmounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { getFriend } from "@/utils/api/user"
import NoData from "@/components/NoData.vue"
import { useNotifyStore } from "@/stores/notify"
import { useChatStore } from "@/stores/chat"
import { iconsUser, iconGroup } from "@/config/constraint"
// import { socket } from "@/socket";
import { getSocket } from "@/socket";
import Mask from "@/components/Mask.vue"
import { insertGroupRoomUser, insertGroupChat, getGroupRoomList, deleteGroupUser } from "@/utils/api/group_chat"
import AddGroupForm from '@/components/form/AddGroupForm.vue';
import AddRoomForm from '@/components/form/AddRoom.vue';
const notifyStore = useNotifyStore()
const userStore = useUserStore();
const chatStore = useChatStore();
const router = useRouter()
const friendList = ref([]);
const groupRoomList = ref([]);
const resizableRef = ref();
const resizerRef = ref();
const customMenuRef = ref(null);
const activeId = ref();
const showCreateRoom = ref(false);
const showAddRoom = ref(false);
const info = reactive({
    selectId: '',
    username: '',
    avatar: ''
})
const activeSelectId = ref(1);
const searchText = ref('');
const showList = ref([]);
watch(searchText, (newValue, oldValue) => {
    if (newValue.length === 0) {
        if (activeSelectId.value === 1) {
            showList.value = friendList.value;
        } else {
            showList.value = groupRoomList.value;
        }
    } else {
        if (activeSelectId.value === 1) {
            showList.value = friendList.value.filter(chat => {
                return chat.username.indexOf(newValue) !== -1
            });
        } else {
            showList.value = groupRoomList.value.filter(chat => {
                return chat.roomName.indexOf(newValue) !== -1
            });
        }
    }
})
function jump(roomId, receiveId) {
    notifyStore.updateAsideActive(2);
    chatStore.updateChatActive(roomId);
    chatStore.updateActiveRoomId(roomId);
    let path;
    if (activeSelectId.value === 1) {
        path = `/chat/chatsingleroom/${roomId}?receiveId=${receiveId}`;
    } else {
        path = `/chat/chatgrooproom/${roomId}`;
    }

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
function menuFn(event, id) {
    event.preventDefault();
    activeId.value = id;
    if (customMenuRef.value && customMenuRef.value[0]) {
        customMenuRef.value[0].style.display = 'block';
        customMenuRef.value[0].style.left = `0px`;
        customMenuRef.value[0].style.top = `${event.pageY}px`;
    }
}
function clickHandle(e, params) {
    e.stopPropagation();
    info.selectId = params.id;
    info.username = params.username;
    info.avatar = params.avatar;
    if (params.iconId == 9) {
        goDetailFn(params.id);
    }
    if (params.iconId == 10) {
        deleteFriendFn(params.id, params.username);
    }
    if (params.iconId == 11) {
        showCreateRoom.value = true;
    }
    if (params.iconId == 12) {
        showAddRoom.value = true;
    }
    documentClickFn();
}
async function quitGroup(e, params) {
    e.stopPropagation();
    const data = {
        roomId: params.roomId, joinId: userStore.user.info.id, handleId: userStore.user.info.id
    }
    const { data: resp } = await deleteGroupUser(data);
    if (resp.code !== 200) {
        return alert(resp.message);
    }
    const indexOf = groupRoomList.value.findIndex((item) => item.roomId === params.roomId);
    groupRoomList.value.splice(indexOf, 1);
    const roomId = params.roomId;
    const sendId = userStore.user.info.id;
    const conment = `${userStore.user.info.username}退出了群聊`;
    const type = 1;
    const sendIdUsername = userStore.user.info.username;
    const sendIdAvatar = userStore.user.info.avater;
    const deleteId = userStore.user.info.id;
    const chatParams = {
        roomId, sendId, conment, type, sendIdUsername, sendIdAvatar, deleteId, isChat: false
    }
    const socket = getSocket();
    socket.emit("send_group_chat", chatParams);
}
function goDetailFn(id) {
    customMenuRef.value[0].style.display = 'none'; // 点击后隐藏菜单
    router.push(`/user?id=${id}`)
}
function deleteFriendFn(id, username) {
    const flag = confirm(`你确定要与${username}解除好友关系吗？如果解除，聊天记录也将会清除`);
    if (flag) {
        console.log("解除成功");
    }
    customMenuRef.value[0].style.display = 'none'; // 点击后隐藏菜单
}
async function confirmFn(roomId) {
    showCreateRoom.value = false;
    // 1是群主 2是管理员 3是群众
    await joinGroupFn(roomId, userStore.user.info.id, 1);//给主动邀请者房主权限
    await joinGroupFn(roomId, info.selectId, 3);//给被邀请者普通用户权限
    const data1 = {
        roomId,
        sendId: userStore.user.info.id,
        conment: `${userStore.user.info.username}加入房间`
    }
    const data2 = {
        roomId,
        sendId: info.selectId,
        conment: `${info.username}加入房间`
    }
    await insertGroupChat(data1);
    await insertGroupChat(data2);

}
async function confirmAddRoomFn(roomId) {
    showAddRoom.value = false;
    // 1是群主 2是管理员 3是群众
    const code = await joinGroupFn(roomId, info.selectId, 3);//给被邀请者普通用户权限
    if (code == -1) {
        return
    }
    const sendId = info.selectId;
    const conment = `${info.username}加入房间`
    const data = {
        roomId,
        sendId,
        conment
    }
    const type = 1;
    const sendIdUsername = info.username;
    const sendIdAvatar = info.avatar;
    const params = { roomId, sendId, conment, type, sendIdUsername, sendIdAvatar, isChat: false, addUser: true };
    const socket = getSocket();
    socket.emit("send_group_chat", params);
    await insertGroupChat(data);
}
// 1是群主 2是管理员 3是群众
async function joinGroupFn(roomId, joinId, identity = 3) {
    customMenuRef.value[0].style.display = 'none'; // 点击后隐藏菜单
    const data = {
        roomId, joinId, identity
    }
    const { data: resp } = await insertGroupRoomUser(data);
    if (resp.code !== 200) {
        return -1;
    }
}
function documentClickFn(e) {
    if (customMenuRef.value && customMenuRef.value[0]) {
        customMenuRef.value[0].style.display = 'none'; // 点击后隐藏菜单
    }
}
async function handleClick(selectId) {
    activeSelectId.value = selectId;
    if (selectId === 1) {//好友
        const params = { id: userStore.user.info.id };
        const { data: resp } = await getFriend(params);//默认请求好友列表
        const { data } = resp;
        if (resp.code === 200) {
            friendList.value = data;
            showList.value = friendList.value;
        }
        return;
    }
    if (selectId === 2) {//群聊
        const params = { joinId: userStore.user.info.id };
        const { data: resp } = await getGroupRoomList(params);//默认请求好友列表
        const { data } = resp;
        if (resp.code === 200) {
            groupRoomList.value = data;
            showList.value = groupRoomList.value;
        }
        return;
    }
}
onBeforeMount(async () => {
    const params = { id: userStore.user.info.id };
    const { data: resp } = await getFriend(params);//默认请求好友列表
    const { data } = resp;
    if (resp.code === 200) {
        friendList.value = data;
        showList.value = friendList.value;
    }
})
onMounted(() => {
    document.addEventListener("click", documentClickFn);
})
onUnmounted(() => {
    // document.removeEventListener(documentClickFn);
});

</script>
<template>
    <div class="FriendList-container" ref="resizableRef">
        <h3><span :class="{ active: activeSelectId === 1 }" @click="handleClick(1)">好友</span>/
            <span :class="{ active: activeSelectId === 2 }" @click="handleClick(2)">群聊</span>
        </h3>
        <div class="resizer" ref="resizerRef" @mousedown="mousedownHandle"></div>
        <div class="search">
            <input type="text" name="search" id="search" placeholder="输入昵称" v-model="searchText">
            <div class="icons">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
            </div>
        </div>
        <template v-if="showList.length > 0">
            <template v-if="activeSelectId === 1">
                <div class="frind hover" v-for="(item) of showList" :key="item.roomId"
                    @click="jump(item.roomId, item.id)" @contextmenu="(event) => menuFn(event, item.id)">
                    <img :src="item.avatar" alt="用户头像" title="用户头像" loading="lazy">
                    <strong :title="item.username">{{ item.username }}</strong>
                    <div v-if="activeId === item.id" ref="customMenuRef" id="customMenu">
                        <ul>
                            <li v-for="iconItem in iconsUser" @click="(event) => clickHandle(
                                event,
                                {
                                    ...iconItem,
                                    ...item
                                }
                            )" :key="iconItem.iconId">
                                <div class="more_icon">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="iconItem.class"></use>
                                    </svg>
                                </div>
                                <span>{{ iconItem.title }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="group hover" v-for="(item) of showList" :key="item.roomId"
                    @contextmenu="(event) => menuFn(event, item.id)" @click="jump(item.roomId, item.id)">
                    <img :src="item.avatar" alt="群聊头像" title="群聊头像">
                    <strong :title="item.roomName">{{ item.roomName }}</strong>
                    <div v-if="activeId === item.id" ref="customMenuRef" id="customMenu">
                        <ul>
                            <li v-for="iconItem in iconGroup" @click="(event) => quitGroup(
                                event,
                                {
                                    ...iconItem,
                                    ...item
                                }
                            )" :key="iconItem.iconId">
                                <div class="more_icon">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="iconItem.class"></use>
                                    </svg>
                                </div>
                                <span>{{ iconItem.title }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
        </template>
        <NoData class="no-data" v-else>
        </NoData>
        <keep-alive>
            <Mask v-model="showCreateRoom">
                <AddGroupForm :confirmFn="confirmFn"></AddGroupForm>
            </Mask>
        </keep-alive>
        <keep-alive>
            <Mask v-model="showAddRoom">
                <AddRoomForm :hasConment="false" :confirmFn="confirmAddRoomFn"></AddRoomForm>
            </Mask>
        </keep-alive>
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

h3 {
    position: sticky;
    top: 0;
    z-index: 10;
}

h3 span {
    cursor: pointer;
}

h3 span:hover {
    color: red;
}

.search {
    width: 100%;
    height: 4vh;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    position: sticky;
    top: 4vh;
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

.frind,
.group {
    cursor: pointer;
    box-sizing: border-box;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 2px;
    padding-left: 5px;
    margin-bottom: 20px;
}

.frind div {
    margin-right: 5px;
}

.active {
    color: #1cff00;
}

.frind img,
.group img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
}

.frind strong,
.group strong {
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

#customMenu {
    display: none;
    display: flex;
    flex-direction: column;
    position: absolute;
    background: white;
    background-color: var(--menu_background_color);
    color: var(--menu_color);
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

#customMenu li .more_icon {
    width: 30px;
    height: 30px;
}

#customMenu li:hover {
    background: #656565;
    /* 悬停效果 */
}
</style>