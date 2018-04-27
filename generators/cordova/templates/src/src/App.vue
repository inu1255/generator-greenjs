<template>
	<div id="app">
		<transition>
			<drawer v-if="user" :show="show" @update:show="toggleDrawer" placement="left" show-mode="push">
				<drawer-menu slot="drawer"></drawer-menu>
				<router-view></router-view>
			</drawer>
			<login v-else></login>
		</transition>
		<div v-transfer-dom>
			<loading :show="Boolean(loading)"></loading>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Login from './pages/Login'

export default {
	name: 'app',
	data() {
		return {}
	},
	computed: {
		...mapState({
			show: state => state.app.show,
			loading: state => state.app.loading,
			user: state => state.user.user,
		})
	},
	methods: {
		...mapActions(["toggleDrawer"]),
	},
	components: {
		'login': Login
	}
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}
</style>
