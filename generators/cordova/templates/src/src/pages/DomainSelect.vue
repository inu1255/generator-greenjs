<template>
	<view-box ref="viewBox">
		<x-header slot="header">
			域名名单
			<a @click="edit" slot="right">添加</a>
		</x-header>
		<swipeout>
			<swipeout-item v-for="x in black" :key="x.id" transition-mode="follow">
				<div slot="right-menu">
					<swipeout-button @click.native="edit(x)" type="primary">编辑</swipeout-button>
					<swipeout-button @click.native="del(x.id)" type="warn">删除</swipeout-button>
				</div>
				<div slot="content" @click="use(x)" class="demo-content vux-1px-t">
					{{x.title}}
				</div>
			</swipeout-item>
		</swipeout>
		<div v-transfer-dom>
			<popup is-transparent v-model="adding">
				<group>
					<x-input v-model="title" title="标题" placeholder="规则名"></x-input>
					<x-textarea v-model="domains" :rows="6" placeholder="域名列表，支持多行"></x-textarea>
					<x-switch title="黑名单" v-model="all_proxy"></x-switch>
					<divider></divider>
					<div style="padding:10px 15px">
						<x-button type="primary" @click.native="submit">确定</x-button>
					</div>
				</group>
			</popup>
		</div>
		<tab class="bottom" slot="bottom">
			<tab-item v-for="(item,i) in tabs" :key="i" :selected="i==tab" @on-item-click="changeTab(i)">{{item}}</tab-item>
		</tab>
	</view-box>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			tabs: ["白名单", "黑名单"],
			tab: 0,
			adding: false,
			more: false,
			selected: [],
			id: 0,
			title: "",
			domains: "",
			all_proxy: false,
		}
	},
	computed: {
		...mapState({
			black: state => state.app.black,
		}),
		list() {
			return this.black.filter(x => x.all_proxy == this.tab)
		}
	},
	methods: {
		...mapActions(["getBlack"]),
		async submit() {
			let { id, title, domains, all_proxy } = this
			if (id) {
				await this.$r("/black/set", { id, title, domains, all_proxy })
			} else {
				await this.$r("/black/add", { title, domains, all_proxy })
			}
			this.adding = false
			this.getBlack()
		},
		edit(x) {
			if (x.title) {
				this.id = x.id;
				this.title = x.title;
				this.domains = x.domains;
				this.all_proxy = x.all_proxy;
			} else {
				this.id = 0
			}
			this.adding = true
		},
		use(x) {
			let domains = x.domains.split("\n")
			this.$store.commit('config.domains', domains)
			this.$store.commit('config.all_proxy', x.all_proxy)
			this.$router.go(-1)
		},
		async del(id) {
			await this.$r("/black/del?id=" + id)
			this.getBlack()
		}
	},
	mounted() {
		this.getBlack()
	}
}
</script>
<style lang="less">
.demo-content {
  padding: 10px 10px;
}
</style>
