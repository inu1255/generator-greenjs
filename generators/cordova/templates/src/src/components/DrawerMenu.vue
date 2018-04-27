<template>
	<div class="drawer-menu">
		<div class="head">
			<img :src="logo" alt="">
			<h3>魂签</h3>
			<small>inu1255 &lt;929909260@qq.com&gt;</small>
		</div>
		<group @click.native="toggleDrawer">
			<cell title="主页" :link="{path:'/'}" is-link>
				<x-icon slot="icon" type="home" size="24"></x-icon>
			</cell>
			<cell title="代理" :link="{path:'/proxy'}">
				<x-icon slot="icon" type="plane" size="24"></x-icon>
			</cell>
		</group>
		<group>
			<cell title="退出登录" @click.native="logout" is-link>
				<x-icon slot="icon" type="log-out" size="24"></x-icon>
			</cell>
		</group>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	props: ["logo", "title", "description"],
	methods: {
		...mapActions(["toggleDrawer", "logout"]),
	}
}
</script>

<style lang="less">
.drawer-menu {
  width: 60vw;
  .head {
    padding: 15px;
    padding-bottom: 0;
  }
}
</style>
