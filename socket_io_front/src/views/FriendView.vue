<script setup>
import FriendList from '@/components/friend/FriendList.vue';
import { useUserStore, } from '@/stores/user';
const userStore = useUserStore();
</script>
<template>
    <FriendList v-if="userStore.user.info.id"></FriendList>
</template>

<style scoped></style>