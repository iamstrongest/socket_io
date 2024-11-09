<script setup>
import { updateGroupRequest } from "@/utils/api/group_chat"
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
// import { socket } from "@/socket";
import { getSocket } from "@/socket";
const props = defineProps({
    avatar: {
        default: null,
        type: String || null,
    },
    id: Number,
    joinId: Number || String,
    conment: String,
    username: String,
    status: Number,
    userType: Number,
    sendId: Number,
    receiveId: Number,
    handleUsername: String || null,
    canHandle: {
        default: null,
        type: Number || null,
    },
    roomId: Number||String,
    roomName: String
})
const emits = defineEmits(['handleClickEmit']);
async function handleClick(status) {
    const params = { status, conment: props.conment, joinId: props.joinId, roomId: props.roomId, handleId: userStore.user.info.id };
    const { data: resp } = await updateGroupRequest(params);
    const { data } = resp;
    if (resp.code === 200) {
        alert(resp.message);
        const emitParams = {
            id: props.id,
            status: status,
        }
        emits('handleClickEmit', emitParams);
    }
    // const sendParams = {
    //     type: 3,//处理申请
    //     status, receiveId: props.receiveId, sendId: props.sendId
    // }
    // socket.emit('send_notify', sendParams)
}
</script>
<template>
    <div class="request-card-container">
        <div v-if="props.avatar" class="avatar">
            <img :src="props.avatar" alt="申请者照片">
            <span>群名:{{ props.roomName }}</span>
        </div>
        <div class="info">
            <h3 :title="props.username">{{ props.username }}</h3>
            <p class="conment" :title="props.conment">{{ props.conment }}</p>
        </div>
        <div class="state">
            <template v-if="props.status == 1">
                <div class="btns" v-if="props.canHandle == 1">
                    <button class="button reject" type="button" title="拒绝"
                        @click="handleClick(3, props.joinId)">拒绝</button>
                    <button class="button" type="button" title="同意"
                        @click="handleClick(2, props.joinId, props.conment)">同意</button>
                </div>
                <div class="wait-container" v-else>
                    <div class="font_icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dengdai"></use>
                        </svg>
                    </div>
                    <strong class="wait">待确认</strong>
                </div>

            </template>
            <div class="common">
                <template v-if="props.status == 3">
                    <div class="inner">
                        <div class="font_icon">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-shibai"></use>
                            </svg>
                        </div>
                        <strong class="reject">已拒绝</strong>
                    </div>
                    <p>处理人:{{ props.handleUsername }}</p>
                </template>
                <template v-if="props.status == 2">
                    <div class="inner">
                        <div class="font_icon">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-chenggong"></use>
                            </svg>
                        </div>
                        <strong class="agree">已同意</strong>
                    </div>
                    <p>处理人:{{ props.handleUsername }}</p>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.request-card-container {
    width: 600px;
    height: 150px;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: var(--request_card_background_color);
    color: var(--request_card_font_color);
    border-color: var(--border__color);
    display: flex;
    align-items: center;
    margin: 50px 0;
}
.request-card-container p {
    max-height: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: wrap;
}
.avatar,
.info,
.state {
    flex: 1;
    box-sizing: border-box;
    padding-left: 10px;
}

.avatar {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.avatar img {
    width: 50px;
    height: 50px;
}

.btns {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.state button {
    margin: 0 10px;
}

.wait-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.username .conment {
    width: 100px;
    height: 50px;
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 隐藏溢出部分 */
    text-overflow: ellipsis;
}

.submit {
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    cursor: pointer;
    width: 50px;
    height: 30px;
    border: 2px solid #55bfa0;
    border-radius: 4px;
    color: #50b9fe;
    background-color: #fff;
}

.wait {
    color: var(--wait_font_color);
}

.reject {
    color: var(--reject_font_color);
}

.agree {
    color: var(--confirm_font_color);
}

.font_icon {
    width: 25px;
    height: 25px;
}

.state .common {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.inner {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>