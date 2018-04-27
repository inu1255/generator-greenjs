<template>
	<view-box ref="viewBox">
		<x-header :right-options="{showMore: false}" @on-click-more="onClickMore" slot="header">
			<x-icon @click="toggleDrawer" type="navicon" size="35" slot="overwrite-left"></x-icon>代理
		</x-header>
		<group>
			<x-switch title="代理状态" v-model="agent_start"></x-switch>
			<cell title="代理地址" :value="agent" :link="{path:'proxy-select'}"></cell>
			<cell title="代理模式" :value="all_proxy?'黑名单':'白名单'" :link="{path:'domain-select'}"></cell>
			<cell-form-preview v-show="domains.length" :list="preview"></cell-form-preview>
		</group>
	</view-box>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			tabs: ["签到", "任务"],
			tab: 0,
			keyword: "",
			selected: []
		}
	},
	computed: {
		...mapState({
			all_proxy: state => state.config.all_proxy,
			domains: state => state.config.domains,
		}),
		preview() {
			let value = this.all_proxy ? "不代理" : "代理"
			return this.domains.map(x => ({ label: x, value }))
		},
		agent_start: {
			get() {
				return this.$store.state.config.agent_start
			},
			set(value) {
				this.setAgentStart(value)
			}
		},
		agent: {
			get() {
				return this.$store.state.config.agent
			},
			set(value) {
				this.$store.commit('config.agent', value)
			}
		},
	},
	methods: {
		...mapActions(["setAgentStart", "toggleDrawer"]),
		toggleAgent(flag) {
			console.log(flag)
			if (flag) {
				console.log("start proxy");
				window.inu.proxy.start();
			} else {
				console.log("stop proxy");
				window.inu.proxy.stop();
			}
		},
		search() {
			this.$refs.search.setBlur()
		},
		changeTab(i) {
			this.tab = i;
		},
		onClickMore() {

		}
	}
}
</script>
