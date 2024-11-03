<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-20 21:37:56
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-10-31 17:46:43
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\views\FriendView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import FriendList from '@/components/friend/FriendList.vue';
import { useUserStore, } from '@/stores/user';
const userStore = useUserStore();
</script>
<template>
    <FriendList v-if="userStore?.user?.info?.id"></FriendList>
</template>

<style scoped></style>