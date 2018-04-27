<template>
	<view-box ref="viewBox" body-padding-top="134px">
		<div slot="header">
			<x-header slot="header">
				代理软件
				<a @click="submit" slot="right">确定</a>
			</x-header>
			<tab>
				<tab-item v-for="(item,i) in tabs" :key="i" :selected="i==tab" @on-item-click="changeTab(i)">{{item}}</tab-item>
			</tab>
			<search :auto-fixed="false" v-model="keyword" @on-clear="search" @on-submit="search"></search>
		</div>
		<checklist :options="list" v-model="selected"></checklist>
	</view-box>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	name: 'AppSelect',
	data() {
		return {
			tabs: ["已选", "第三方", "系统"],
			tab: 1,
			keyword: "",
			selected: this.$store.state.config.apps_allow,
		}
	},
	computed: {
		apps: {
			get() {
				return this.$store.state.config.apps
			},
			set(value) {
				this.$store.commit('config.apps', value)
			}
		},
		apps_allow: {
			get() {
				return this.$store.state.config.apps_allow
			},
			set(value) {
				this.$store.commit('config.apps_allow', value)
			}
		},
		list0() {
			return this.apps.filter(x => this.selected.indexOf(x.package) >= 0)
		},
		list1() {
			return this.apps.filter(x => !x.isSys)
		},
		list2() {
			return this.apps.filter(x => x.isSys)
		},
		list() {
			let list = this["list" + this.tab]
			if (this.keyword) list = list.filter(x => x.package.indexOf(this.keyword) >= 0 || x.name.indexOf(this.keyword) >= 0)
			return list.map(x => ({ key: x.package, value: x.name, inlineDesc: x.package }))
		}
	},
	methods: {
		search() {
			this.$refs.search.setBlur()
		},
		changeTab(i) {
			this.tab = i;
		},
		submit() {
			this.apps_allow = this.selected
			this.$router.go(-1)
		}
	}
}
</script>

