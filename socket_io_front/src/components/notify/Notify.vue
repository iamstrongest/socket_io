<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-24 10:41:25
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-27 11:47:57
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\components\notify\Notify.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { useNotifyStore } from '@/stores/notify';
const notifyStore = useNotifyStore();
const props = defineProps({
    id: Number,
    status: Number,//通知状态
    sendId: Number,//发送者
    receiveId: Number,//接受者
    conment: String,//信息内容
    type: Number //信息类型
})
async function handleClick(id, status = 1) {
    const data = { id, status };
    await notifyStore.updateNotifiy(data);
}
</script>
<template>
    <div class="notify">
        <h3 v-if="props.type == 1"> 系统通知</h3>
        <h3 v-else-if="props.type == 2">好友申请</h3>
        <h3 v-else-if="props.type == 3">申请反馈</h3>
        <div class="content">
            <article :title="props.conment">{{ props.conment }}</article>
            <div class="status" v-if="props.status == 0">
                <div class="font_icon" title="待确认">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dengdai"></use>
                    </svg>
                </div>
                <button type="button" @click="handleClick(props.id)">确认</button>
            </div>
            <div class="status" v-if="props.status == 1">
                <div class="font_icon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-chenggong"></use>
                    </svg>
                </div>
                <span class="conform">已确认</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.notify {
    width: 600px;
    height: 150px;
    border-radius: 3px;
    border: 1px solid #ccc;
    border-color: var(--border__color);
    margin: 50px 0;
    display: flex;
    flex-direction: column;
}

h3 {
    text-align: center;
    margin: 10px 0;
}

.content {
    display: flex;
    flex: 1;
    padding: 10px;
}

.content article {
    flex: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.content .status {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

}

.content .font_icon {
    width: 30px;
    height: 30px;
}

button {
    width: 50px;
    height: 30px;
    border: 2px solid #55bfa0;
    border-radius: 4px;
    color: #50b9fe;
    background-color: #fff;
}
.conform {
    color: var(--confirm_font_color);
}
</style>