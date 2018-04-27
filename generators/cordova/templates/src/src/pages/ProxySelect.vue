<template>
	<view-box ref="viewBox">
		<x-header :right-options="{showMore:false}" slot="header">
			代理地址
			<a @click="adding=true" slot="right">添加</a>
		</x-header>
		<swipeout>
			<swipeout-item v-for="(x,i) in agent_list" :key="i" transition-mode="follow">
				<div slot="right-menu">
					<swipeout-button @click.native="del(x)" type="warn">删除</swipeout-button>
				</div>
				<div slot="content" @click="use(x)" class="demo-content vux-1px-t">
					<icon :type="x==agent?'success':'circle'"></icon>
					{{x}}
				</div>
			</swipeout-item>
		</swipeout>
		<div v-transfer-dom>
			<confirm v-model="adding" show-input :close-on-confirm="false" title="添加代理" @on-confirm="addAgent"></confirm>
		</div>
	</view-box>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			adding: false,
			more: false,
			submit: false,
		}
	},
	computed: {
		agent: {
			get() {
				return this.$store.state.config.agent
			},
			set(value) {
				if (this.$store.state.config.agent != value)
					this.$store.commit('config.agent', value)
			}
		},
		agent_list: {
			get() {
				return this.$store.state.config.agent_list
			},
			set(value) {
				if (this.$store.state.config.agent_list != value)
					this.$store.commit('config.agent_list', value)
			}
		},
	},
	methods: {
		addAgent(v) {
			if (/^\w+(\.\w+)+:\d+$/.test(v)) {
				this.agent_list = this.agent_list.concat([v])
				this.adding = false
			} else {
				this.$vux.toast.text("格式不正确")
			}
		},
		use(x) {
			this.agent = x
			this.$router.go(-1)
		},
		del(x) {
			this.agent_list = this.agent_list.filter(s => s != x)
		},
	}
}
</script>
<style lang="less">
.demo-content {
  padding: 10px 10px;
}
</style>
