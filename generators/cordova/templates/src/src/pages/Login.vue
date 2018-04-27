<template>
	<view-box ref="viewBox">
		<x-header :left-options="{showBack:false}" slot="header">
			魂签
			<a @click="query.reg=!query.reg" slot="right">{{query.reg?'登录':'注册'}}</a>
		</x-header>
		<group>
			<x-input v-show="query.reg" is-type="email" label-width="4em" v-model="email" title="邮箱" placeholder="邮箱"></x-input>
			<x-input label-width="4em" v-model="title" title="用户名" :placeholder="query.reg?'用户名':'用户名/邮箱'"></x-input>
			<x-input label-width="4em" v-model="password" title="密码" placeholder="密码" type="password"></x-input>
		</group>
		<div style="padding:15px;">
			<x-button @click.native="submit" type="primary">{{query.reg?'注册':'登录'}}</x-button>
		</div>
	</view-box>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			email: "",
			title: this.$store.state.user.body.title,
			password: this.$store.state.user.body.password,
			query: this.$q({
				reg: null
			})
		}
	},
	computed: {
	},
	methods: {
		...mapActions(["login", "register"]),
		submit() {
			if (this.query.reg) {
				let { email, title, password } = this
				this.register({ title: email, account: title, password, code: 1024 })
			} else {
				let { title, password } = this
				this.login({ title, password })
			}
		}
	}
}
</script>
