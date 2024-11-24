<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-24 22:48:33
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-30 14:23:54
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\views\AllUserView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onBeforeMount, ref } from 'vue';
import { getAllUserDetailFn } from "@/utils/api/user";
const userList = ref([]);
onBeforeMount(async () => {
    const { data: resp } = await getAllUserDetailFn();
    const { data } = resp;
    userList.value = data;
    console.log(userList.value);
})
</script>
<template>
    <div class="all-user-container" v-if="userList.length > 0">
        <div v-for="user of userList" :key="user.id">
            <img :src="user.avatar" alt="用户头像" loading="lazy">
            <div>
                <div>
                    <span>id:{{ user.id }}</span>
                    <span>昵称：{{ user.username }}</span>
                </div>
                <div>
                    邮箱：{{ user.email }}
                </div>
                <div>
                    留言： {{ user.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.all-user-container {
    width: 100%;
    height: 100vh;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    padding-top: 20px;
}
img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
}

span {
    margin-right: 20px;
}
</style>