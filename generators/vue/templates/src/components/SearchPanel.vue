<template>
	<div class="page-search-panel" v-show="show">
		<el-dialog title="选择工具" :visible.sync="show" width="30%">
			<el-select v-model="path" filterable allow-create placeholder="请选择" @change="change">
				<el-option v-for="item in list" :key="item.path" :label="item.name" :value="item.path"></el-option>
			</el-select>
			<el-button title="退出登录" @click.native="logout" icon="ion-log-out">退出登录</el-button>
		</el-dialog>
		<transition enter-active-class="animated fadeInDown">
			<div v-transfer-dom v-show="!show" @click="toggle" class="page-search-panel-menu v-transfer-dom">
				<i-icon type="chevron-down"></i-icon>
			</div>
		</transition>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import routes from '../router/routes.js';

export default {
	data() {
		return {
			path: "",
			value: "",
			show: false,
			prev: 0,
		}
	},
	computed: {
		list() {
			if (!this.value) return routes
			let v = this.value.toLowerCase()
			return routes.filter(x => x.name.toLowerCase().indexOf(v) >= 0)
		}
	},
	methods: {
		...mapActions(["logout"]),
		toggle(e) {
			this.show = !this.show
		},
		change(path) {
			this.$router.push({ path: path })
			this.show = false
		},
		cancel() {
			this.show = false
		},
		submit() {
			this.$router.push({ path: this.value })
			this.show = false
		},
		clear() {
			let cur = new Date().getTime()
			if (cur - this.prev < 1e3)
				this.show = false
			this.prev = cur
		}
	}
}
</script>
<style lang="less">
.page-search-panel-menu.v-transfer-dom {
  position: fixed;
  top: 5px;
  left: 50%;
  right: 50%;
}
</style>
