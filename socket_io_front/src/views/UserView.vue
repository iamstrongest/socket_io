<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getUserDetailFn } from "@/utils/api/user";
const route = useRoute();
const userinfo = ref({});
onBeforeMount(async () => {
    const id = route.query.id;
    const { data: resp } = await getUserDetailFn({ id });
    const { data } = resp;
    userinfo.value = data;
    console.log(userinfo.value);
})
</script>
<template>
    <div class="detail-container" v-if="userinfo.id">
        <img :src="userinfo.avatar" alt="用户头像">
        <div>
            <div>
                <span>id:{{ userinfo.id }}</span>
                <span>昵称：{{ userinfo.username }}</span>
            </div>
            <div>
                邮箱：{{ userinfo.email }}
            </div>
            <div>
                留言： {{ userinfo.description }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.detail-container {
    flex: 1;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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