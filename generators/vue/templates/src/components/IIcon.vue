<template>
	<i @click="click" :class="cls" :style="style"></i>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			required: true
		},
		size: [Number, String],
		rotate: Number,
		loading: Boolean,
	},
	computed: {
		style() {
			let style = {}
			if (this.size) style.fontSize = /\d$/.test(this.size) ? this.size + 'px' : this.size
			if (this.rotate) style.transform = `rotate(${this.rotate}deg)`
			return style
		},
		cls() {
			let cls = {}
			cls[this.type] = true
			if (this.loading) cls.loading = true
			return cls
		}
	},
	methods: {
		click() {
			this.$emit("click")
		}
	}
}
</script>
<style lang="less" scoped>
@import "~@/styles/methods.less";

i {
  transition: transform 0.5s;
  &.loading {
    .loading;
  }
}
</style>

