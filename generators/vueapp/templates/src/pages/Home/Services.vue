<template>
	<div class="list-page">
		<Header>
			<span slot="left" class="ion-navicon"></span>
			<span>{{services.notice}}</span>
			<router-link slot="right" class="ion-qr-scanner" to="/barcode"></router-link>
		</Header>
		<ul>
			<PullRefresh :refresh="refresh" :loadmore="loadmore">
				<Service v-for="x in services" :key="x.id" :data="x"></Service>
			</PullRefresh>
		</ul>
	</div>
</template>

<script>
import Service from "./Service";
import { mapGetters, mapState } from "vuex";

export default {
	computed: {
		...mapGetters(["services"])
	},
	components: {
		Service
	},
	methods: {
		scan() {
			console.log("scan")
		},
		async refresh() {
			await this.$store.dispatch("getMysub")
		},
		async loadmore() {
			await this.$store.dispatch("getMysub", true)
		}
	},
	mounted(){
		console.log("mounted")
		this.refresh()
	}
}
</script>


<style lang="less" scoped>
.services {
}
</style>
