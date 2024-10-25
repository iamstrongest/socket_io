<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-22 10:52:17
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-24 15:01:47
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\views\FriendRequestListView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 好友请求列表 -->
<script setup>
import { onMounted, ref } from 'vue';
import { getFriendRequestList } from "@/utils/api/request"
import RequestCard from "@/components/request/RequestCard.vue"
import { useUserStore } from '@/stores/user';
import NoData from "@/components/NoData.vue"
const userStore = useUserStore();
const requestList = ref([]);
onMounted(async () => {
  const params = { id: userStore.user.info.id }
  const { data: resp } = await getFriendRequestList(params);
  const { data } = resp;
  if (resp.code === 200) {
    requestList.value = data;
  }

})
function changeStatus(params) {
  requestList.value.forEach((item) => {
    if (item.id == params.id) {
      item.status = params.status;
    }
  })
}
</script>
<template>
  <div class="container">
    <p>好友申请列表列表</p>
    <div class="datalist" v-if="requestList.length > 0">
      <RequestCard v-for="item of requestList" :key="item.id" :id="item.id" :conment="item.conment"
        :receiveId="item.receiveId" :sendId="item.sendId" :userType="item.userType" :avatar="item.avatar"
        :username="item.username" :status="item.status" @handleClickEmit="changeStatus">
      </RequestCard>
    </div>
    <NoData v-else class="no-data"></NoData>
    <!-- <div class="no-data" v-else>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meiyoushuju"></use>
      </svg>
    </div> -->


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