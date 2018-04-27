<template>
	<view-box ref="viewBox">
		<x-header :right-options="{showMore: false}" @on-click-more="onClickMore" slot="header">
			<x-icon @click="toggleDrawer" type="navicon" size="35" slot="overwrite-left"></x-icon>魂签
			<router-link to="/proxy" slot="right">代理</router-link>
		</x-header>
		<pull-refresh :refresh="refresh">
			<app-card v-for="x in list" :key="x.id" :item="x" @click="setAim"></app-card>
		</pull-refresh>
		<actionsheet v-model="more" :menus="menu" @on-click-menu="clickMenu" show-cancel>
		</actionsheet>
		<tab class="bottom" slot="bottom">
			<tab-item v-for="(item,i) in tabs" :key="i" :selected="i==tab" @on-item-click="changeTab(i)">{{item}}</tab-item>
		</tab>
	</view-box>
</template>
<script>
import { mapState, mapActions } from "vuex";
import AppCard from "./comps/AppCard.vue";
import config from '../components/config'

export default {
	data() {
		return {
			tabs: ["市场", "我的"],
			tab: 0,
			keyword: "",
			selected: [],
			aim: false,
		}
	},
	computed: {
		...mapState({
			apps: state => state.app.apps,
			mines: state => state.app.mines,
		}),
		list() {
			switch (this.tab) {
				case 0:
					return this.apps.filter(x => !this.mines.find(y => y.aid == x.id))
					break;
				case 1:
					return this.apps.filter(x => this.mines.find(y => y.aid == x.id))
					break;
			}
		},
		more: {
			get() {
				return Boolean(this.aim);
			},
			set(v) {
				if (!v) this.aim = v
			}
		},
		menu() {
			let menu = []
			if (!this.aim) return menu;
			let item = this.aim.item
			if (item.domain) menu.push({ label: '录制脚本', value: 'record' })
			let mine = this.aim.mine
			if (mine) {
				menu.push({ label: '立即签到', value: 'run' })
				if (mine.enable)
					menu.push({ label: '禁用', value: 'disable' })
				else
					menu.push({ label: '启用', value: 'enable' })
			}
			return menu
		}
	},
	methods: {
		...mapActions(["toggleDrawer", "getApps", "getMines"]),
		search() {
			this.$refs.search.setBlur()
		},
		changeTab(i) {
			this.tab = i;
		},
		onClickMore() {

		},
		setAim(x) {
			this.aim = x
		},
		clickMenu(x) {
			let m = this["m_" + x]
			m && m()
		},
		async m_record() {
			let { item } = this.aim
			if (item && item.domain) {
				let data = await this.$r("/app/proxy?aid=" + item.id)
				await window.inu.proxy.stop();
				setTimeout(async () => {
					let agent = `${config.host}:${data.port}`
					await window.inu.proxy.setDomainProxy(item.domain, false)
					await window.inu.proxy.start(agent);
					console.log(`proxy ${agent}`);
					if (startApp && item.package)
						startApp.set({
							"application": item.package
						}).start()
				}, 1e3);
			}
		},
		async m_run() {
			let { item, mine } = this.aim
			if (item && mine) {
				let data = await this.$r("/app/run?aid=" + item.id)
				if (data) {
					this.$vux.toast.text("签到成功")
					this.refresh()
				}
				else this.$vux.toast.text("签到失败")
			}
		},
		async m_enable() {
			let { item } = this.aim
			await this.$r("/app/set", { aid: item.id, enable: true })
			this.refresh()
		},
		async m_disable() {
			let { item } = this.aim
			await this.$r("/app/set", { aid: item.id, enable: false })
			this.refresh()
		},
		refresh() {
			return Promise.all([
				this.getApps(),
				this.getMines(),
			])
		}
	},
	mounted() {
		this.refresh()
	},
	components: {
		'app-card': AppCard
	}
}
</script>
