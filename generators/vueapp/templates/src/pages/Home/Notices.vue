<template>
	<div class="list-page notices">
		<Header>
			<span slot="left" class="ion-ios-arrow-back" @click="$router.go(-1)">返回</span>
			<span>{{current.name}}</span>
			<router-link slot="right" :to="'/service/'+$route.params.sid+'/setting'" class="ion-person"></router-link>
		</Header>
		<ul>
			<Pullmore :refresh="refresh" :loadmore="loadmore">
				<Notice v-for="x in current.notices" :key="x.id" :data="x"></Notice>
			</Pullmore>
		</ul>
	</div>
</template>

<script>
import Notice from "./Notice";
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
		Notice
	},
	methods: {
		readall() {
			console.log("readall")
		},
		async refresh() {
			await this.$store.dispatch("getNotices", {
				sid: this.$route.params.sid
			})
		},
		async loadmore(done) {
			await this.$store.dispatch("getNotices", {
				sid: this.$route.params.sid,
				more: true
			})
		}
	},
	async created() {
		this.$store.dispatch("getNotices", {
			sid: this.$route.params.sid
		})
	}
}
</script>


<style lang="less" scoped>
.notices {
  background: #eee;
}
</style>
