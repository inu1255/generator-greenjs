<template>
	<div class="list-page">
		<Header>
			<span slot="left" class="ion-ios-arrow-back" @click="$router.go(-1)">返回</span>
			<span>{{current.name}}</span>
			<span slot="right" @click="save">保存</span>
		</Header>
		<ul>
			<Service :data="current"></Service>
			<el-button class="w" type="danger" @click="unsub">取消关注</el-button>
		</ul>
	</div>
</template>

<script>
import Notice from "./Notice";
import Service from "./Service";
import { mapState, mapGetters } from "vuex";

export default {
	data() {
		return {
			data: [],
			title: "",
		}
	},
	computed: {
		...mapGetters(["current"])
	},
	components: {
		Notice,
		Service
	},
	methods: {
		save() {
			console.log("save")
		},
		async unsub(){
			await this.$store.dispatch("unsubscribe", this.$route.params.sid)
			this.$router.go(-2)
		}
	}
}
</script>


<style lang="less" scoped>
ul>.service{
	pointer-events: none;
}
</style>
