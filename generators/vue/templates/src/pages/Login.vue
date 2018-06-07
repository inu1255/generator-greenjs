<template>
	<div>
		<a @click="query.reg=!query.reg" slot="right">{{query.reg?'登录':'注册'}}</a>
		<el-input v-show="query.reg" is-type="email" label-width="4em" v-model="email" title="邮箱" placeholder="邮箱"></el-input>
		<el-input label-width="4em" v-model="title" title="用户名" :placeholder="query.reg?'用户名':'用户名/邮箱'"></el-input>
		<el-input label-width="4em" v-model="password" title="密码" placeholder="密码" type="password"></el-input>
		<div style="padding:15px;">
			<el-button @click.native="submit" type="primary">{{query.reg?'注册':'登录'}}</el-button>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		console.log(this)
		return {
			email: "",
			title: this.$store.state.user.body.title,
			password: this.$store.state.user.body.password,
			query: this.$query({
				reg: null
			})
		}
	},
	computed: {
	},
	methods: {
		...mapActions(["login", "register", "toggleDrawer"]),
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
