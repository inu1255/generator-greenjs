<template>
	<div class="drawer-menu">
		<div class="head">
			<img :src="logo" alt="">
			<h3>工具箱</h3>
			<small>inu1255 &lt;929909260@qq.com&gt;</small>
		</div>
		<group @click.native="toggleDrawer">
			<cell v-for="route in routes" :key="route.path" :title="route.name" :link="{path:route.path}">
				<i-icon slot="icon" :type="route.icon"></i-icon>
			</cell>
		</group>
		<group>
			<cell title="退出登录" @click.native="logout" is-link>
				<i-icon slot="icon" type="log-out"></i-icon>
			</cell>
		</group>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import routes from '../router/routes'

export default {
	props: ["logo", "title", "description"],
	data() {
		return {
			routes,
		}
	},
	methods: {
		...mapActions(["toggleDrawer", "logout"]),
		installCert() {
		},
		copyQun() {
		}
	}
}
</script>

<style lang="less">
.drawer-menu {
  .head {
    padding: 15px;
    padding-bottom: 0;
  }
}
</style>
