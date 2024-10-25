<script setup>
import { onBeforeMount } from "vue";
import AddFriendForm from "@/components/form/AddFriend.vue"
import { useUserStore, } from '@/stores/user';
const userStore = useUserStore();
</script>
<template>
    <div class="add-friend-container">
        <AddFriendForm  v-if="userStore.user.info.id">

        </AddFriendForm>
    </div>
</template>

<style scoped>
.add-friend-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: url('@/assets/img/chat_background.png') no-repeat;
    background-position: bottom;
    background-size: cover;
}
</style>