<template>
	<div class="card">
		{{content}}
		<div v-if="payload" class="tools">
			<a v-if="data.url" @click="run">浏览器打开</a>
		</div>
	</div>
</template>

<script>
export default {
	props: ["content", "payload"],
	computed: {
		data() {
			return JSON.parse(this.payload)
		}
	},
	methods:{
		run(){
			window.run(this.data)
		}
	}
}
</script>

<style lang="less" scoped>
.card {
	>.tools{
		margin-top: 3px;
		padding-top: 3px;
		border-top: 1px solid #ccc;
	}
}
</style>
