<script setup>
import { watch, ref, nextTick } from "vue";
const model = defineModel();
const maskRef = ref();
function handleClick(event) {
	event.stopPropagation();
	model.value = false;
}
watch(model, (newValue, oldValue) => {
	if (newValue === true) {
		nextTick(() => {
			maskRef.value.style.visibility = 'visible';
		})
	}
	if (newValue === false) {
		nextTick(() => {
			maskRef.value.style.visibility = 'hidden';
		})
	}
})
</script>
<template>
	<div ref="maskRef" class="mask" @click="handleClick">
		<slot name="default">
			<text>暂无内容</text>
		</slot>
	</div>
</template>
<style scoped>
.mask {
	position: fixed;
	visibility: hidden;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 3;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
