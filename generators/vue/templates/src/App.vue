<template>
	<div id="app" v-loading="loading">
		<transition>
			<!-- <drawer v-if="user" :show="show" @update:show="toggleDrawer" placement="left">
				<drawer-menu slot="drawer"></drawer-menu>
				<router-view></router-view>
			</drawer> -->
			<router-view v-if="user"></router-view>
			<login v-else></login>
		</transition>
		<SearchPanel></SearchPanel>
		<!-- <div v-transfer-dom>
			<loading :show="Boolean(loading)"></loading>
		</div> -->
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
	},
	mounted() {
	}
}
</script>

<style lang="less">
#app {
  height: 100vh;
}
</style>
