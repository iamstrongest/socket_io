<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-24 10:29:18
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-27 12:07:37
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\views\NotifyView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
    height: 95vh;
    color: var(--info_color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: url('@/assets/img/chat_background.png') no-repeat;
    background-position: center;
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