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
            <img :src="user.avatar" alt="用户头像">
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
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
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