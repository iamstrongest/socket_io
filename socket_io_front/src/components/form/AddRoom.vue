<!--
 * @Author: strongest-qiang 1309148358@qq.com
 * @Date: 2024-10-31 12:07:51
 * @LastEditors: strongest-qiang 1309148358@qq.com
 * @LastEditTime: 2024-11-02 12:12:53
 * @FilePath: \Front-end\Vue\Vue3\IM\socket_io\socket_io_front\src\components\form\AddGroupForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { reactive } from "vue";
const form = reactive({
    roomId: '',
    conment: ''
})
const props = defineProps({
    confirmFn: Function,
    hasConment: {
        default: false,
        type: Boolean,
    }
})
const onSubmit = async () => {
    if (form.roomId.length == 0) {
        alert('群号不能为空');
        return;
    }
    if (!props.hasConment) {
        props.confirmFn && props.confirmFn(form.roomId);
        form.roomId = '';
        return;
    }
    if (form.conment.length == 0) {
        alert('附加信息不能为空');
        return;
    }
    props.confirmFn && props.confirmFn(form);
    form.roomId = '';
    form.conment = '';
}

const onClick = (event) => {
    event.stopPropagation();
}
</script>
<template>
    <form @submit.prevent="onSubmit" @click="onClick">
        <div class="form_col">
            <label for="roomId"> <span>群号: </span><input type="text" v-model="form.roomId" id="roomId" name="roomId"
                    placeholder="输入群聊名称"> </label>
        </div>
        <div class="form_col" v-if="props.hasConment">
            <label for="conment"> <span>附加信息: </span><input type="text" v-model="form.conment" id="conment"
                    name="conment" placeholder="输入附加信息"> </label>
        </div>
        <div class="form_col submit">
            <label for="submit"><button type="submit" name="submit" id="submit">申请加入</button> </label>
        </div>
    </form>
</template>

<style scoped>
form {
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    border: 2px solid #fff;
    border-radius: 4px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form_col {
    margin-bottom: 20px;

}

.flie_label div {
    cursor: pointer;
    width: 50px;
    height: 50px;
}

.submit {
    display: flex;
    justify-content: center;
    align-items: center;
}

.form_col button {
    width: 100px;
    height: 30px;
    border: 2px solid #55bfa0;
    border-radius: 4px;
    color: #50b9fe;
    background-color: #fff;
}

input {
    width: 200px;
    height: 40px;
    border-radius: 20px;
}
</style>