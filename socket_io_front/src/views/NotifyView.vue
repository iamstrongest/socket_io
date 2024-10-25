<script setup>
import { useNotifyStore } from "@/stores/notify";
import Notify from "@/components/notify/Notify.vue";
import NoData from "@/components/NoData.vue";
const notifyStore = useNotifyStore();
</script>
<template>
    <div class="nofity-container">
        <div class="nofities">
            <template v-if="notifyStore.notify.data.length === 0">
                <h3>暂无通知</h3>
                <NoData class="no-data"></NoData>
            </template>
            <template v-else v-for="item of notifyStore.notify.data" :key="item.id">
                <Notify :id="item.id" :status="item.status" :send-id="item.sendId" :receive-id="item.receiveId"
                    :conment="item.conment" :type="Number(item.type)">
                </Notify>
            </template>
        </div>
    </div>
</template>

<style scoped>
.nofity-container {
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: url('@/assets/img/chat_background.png') no-repeat;
    background-position: bottom;
    background-size: cover;
}

.nofities {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
}

.nofities h3 {
    margin-top: 20px;
    text-align: center;
}

.no-data {
    flex: 1;
}

.audio {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
}
</style>