<template>
	<div @click="click" v-transfer-dom class="plus-btn">
		<x-icon type="android-add" size="54"></x-icon>
	</div>
</template>
<script>
export default {
	methods: {
		click() {
			this.$emit("click")
		}
	}
}
</script>

<style lang="less">
.plus-btn {
  position: absolute;
  bottom: 46px;
  right: 13px;
  fill: white;
  border-radius: 50%;
  background: hotpink;
  width: 54px;
  height: 54px;
  filter: drop-shadow(2px 2px 3px #888888);
  transition: transform 500ms;
  &:hover {
    transform: rotate(90deg);
  }
}
</style>
