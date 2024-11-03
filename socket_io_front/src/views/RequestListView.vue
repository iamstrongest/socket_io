<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 10:52:17
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-03 12:01:13
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\views\FriendRequestListView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 好友请求列表 -->
<script setup>
import { onMounted, ref } from 'vue';
import { getFriendRequestList, getGroupRequestList } from "@/utils/api/request"
import RequestCard from "@/components/request/RequestCard.vue"
import GroupRequestCard from "@/components/request/GroupRequestCard.vue"
import { useUserStore } from '@/stores/user';
import NoData from "@/components/NoData.vue"
const userStore = useUserStore();
const requestList = ref([]);
const activeSelectId = ref(1);
onMounted(async () => {
  // 默认好友申请展示
  const params = { id: userStore.user.info.id }
  await getFriendRequestListFn(params);

})
function changeStatus(params) {
  requestList.value.forEach((item) => {
    if (item.id == params.id) {
      item.status = params.status;
      item.handleUsername = userStore.user.info.username;
    }
  })
}
async function handleClick(status) {
  activeSelectId.value = status;
  if (status === 1) {
    const params = { id: userStore.user.info.id }
    await getFriendRequestListFn(params);
    return;
  }
  if (status === 2) {
    const params = { joinId: userStore.user.info.id }
    await getGroupRequestListFn(params);
    return;
  }
}
async function getFriendRequestListFn(params) {
  const { data: resp } = await getFriendRequestList(params);
  const { data } = resp;
  if (resp.code === 200) {
    requestList.value = data;
  }
}
async function getGroupRequestListFn(params) {
  const { data: resp } = await getGroupRequestList(params);
  const { data } = resp;
  if (resp.code === 200) {
    requestList.value = data;
  }
}
</script>
<template>
  <div class="container">
    <p><span :class="{ active: activeSelectId === 1 }" @click="handleClick(1)">好友申请</span>/<span
        :class="{ active: activeSelectId === 2 }" @click="handleClick(2)">群聊申请</span></p>
    <div class="datalist" v-if="requestList.length > 0 && activeSelectId == 1">
      <RequestCard v-for="item of requestList" :key="item.id" :id="item.id" :conment="item.conment"
        :receiveId="item.receiveId" :sendId="item.sendId" :userType="item.userType" :avatar="item.avatar"
        :username="item.username" :status="item.status" @handleClickEmit="changeStatus">
      </RequestCard>
    </div>
    <div class="datalist" v-if="requestList.length > 0 && activeSelectId == 2">
      <GroupRequestCard v-for="item of requestList" :key="item.id" :id="item.id" :conment="item.conment"
        :roomName="item.roomName" :canHandle="item.canHandle" :handleUsername="item.handleUsername"
        :joinId="item.joinId" :roomId="item.roomId" :avatar="item.avatar" :status="item.status"
        @handleClickEmit="changeStatus">
      </GroupRequestCard>
    </div>
    <NoData v-if="requestList.length == 0" class="no-data"></NoData>
  </div>
</template>

<style scoped>
.container {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

p {
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

p .active {
  color: #1cff00;
}

p span {
  cursor: pointer;
}

p span:hover {
  color: red;
}

.no-data {
  flex: 1;
}

.datalist {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
</style>