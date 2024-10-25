<script setup>
import { handleFriendRequestList } from "@/utils/api/request"
import { useUserStore } from '@/stores/user';
import { socket } from "@/utils/socket";
const userStore = useUserStore();
const props = defineProps({
    avatar: {
        default: null,
        type: String || null,
    },
    id: Number || String,
    conment: String,
    username: String,
    status: Number,
    userType: Number,
    sendId: Number,
    receiveId: Number
})
const emits = defineEmits(['handleClickEmit']);
async function handleClick(status, id, conment) {

    const params = { status, id, receiveId: props.receiveId, sendId: props.sendId };
    if (conment) {
        params["conment"] = conment;
    }
    const { data: resp } = await handleFriendRequestList(params);
    const { data } = resp;
    if (resp.code === 200) {
        alert(resp.message);
        emits('handleClickEmit', params);
    }
    const sendParams = {
        type: 3,//处理申请
        status, receiveId: props.receiveId, sendId: props.sendId
    }
    socket.emit('send_notify', sendParams)
}
</script>
<template>
    <div class="request-card-container">
        <div v-if="props.avatar" class="avatar">
            <img :src="props.avatar" alt="申请者照片">
        </div>
        <div class="info">
            <h3 :title="props.username">{{ props.username }}</h3>
            <p class="conment" :title="props.conment">{{ props.conment }}</p>
        </div>
        <div class="state">
            <template v-if="props.status == 0">
                <div class="wait-container" v-if="props.userType == 1">
                    <div class="font_icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dengdai"></use>
                        </svg>
                    </div>
                    <strong class="grey">待验证</strong>
                </div>
                <div class="btns" v-if="props.userType == 2">
                    <button class="button reject" type="button" title="拒绝" @click="handleClick(1, props.id)">拒绝</button>
                    <button class="button" type="button" title="同意"
                        @click="handleClick(2, props.id, props.conment)">同意</button>
                </div>
            </template>
            <div class="common">
                <template v-if="props.status == 1">
                    <div class="font_icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shibai"></use>
                        </svg>
                    </div>
                    <strong class="reject">已拒绝</strong>
                </template>
                <template v-if="props.status == 2">
                    <div class="font_icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-chenggong"></use>
                        </svg>
                    </div>
                    <strong class="agree">已同意</strong>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.request-card-container {
    width: 600px;
    height: 100px;
    border-radius: 3px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    margin: 50px 0;
}

.avatar,
.info,
.state {
    flex: 1;
    box-sizing: border-box;
    padding-left: 10px;
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

.grey {
    color: gray;
}

.reject {
    color: red;
}

.agree {
    color: #55bfa0;
}

.font_icon {
    width: 30px;
    height: 30px;
}

.state .common {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>