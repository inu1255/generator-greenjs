<template>
	<div class="page-svn">
		<splite>
			<div slot="left">
				<group label-width="5em" title="选择项目">
					<selector title="项目" :options="list" v-model="q.idx"></selector>
					<cell v-show="cur" primary="content" title="项目名" :value="cur&&cur.title"></cell>
					<cell v-show="cur" primary="content" title="项目位置" :value="cur&&cur.path"></cell>
				</group>
				<div class="margin tac">
					<x-button @click.native="add.show=true" type="primary" mini>添加</x-button>
					<x-button @click.native="ondel" type="warn" mini>删除</x-button>
					<x-button @click.native="refreshInfo" mini>刷新</x-button>
				</div>
				<group label-width="5em" title="项目信息">
					<cell v-show="cur" primary="content" title="项目名" :value="cur&&cur.title"></cell>
					<cell v-show="cur" primary="content" title="项目位置" :value="cur&&cur.path"></cell>
				</group>
			</div>
			<template>
				<tree :data="data" @click="treeClick"></tree>
			</template>
			<x-dialog v-model="add.show" hide-on-blur v-transfer-dom>
				<group class="padding" title="添加项目">
					<x-input placeholder="项目名" v-model="add.title"></x-input>
					<x-textarea placeholder="项目地址" v-model="add.path"></x-textarea>
					<x-button @click.native="onadd" type="primary">添加</x-button>
				</group>
			</x-dialog>
		</splite>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			q: this.$q({
				idx: 0,
			}),
			add: {
				show: false,
				title: "",
				path: "",
			},
			list: [],
			data: [{
				name: "aaa",
				children: [{
					name: "bbb"
				}, {
					name: "ccc",
					children: [{
						name: "bbb"
					}, {
						name: "ccc"
					}, {
						name: "ddd"
					},]
				}, {
					name: "ddd",
					children: [{
						name: "bbb"
					}, {
						name: "ccc"
					}, {
						name: "ddd"
					},]
				},]
			}]
		}
	},
	computed: {
		cur() {
			return this.list[this.q.idx]
		}
	},
	watch: {
		cur() {
			console.log(":cur")
		}
	},
	methods: {
		async refresh() {
			let list = await this.$r("/svn/list")
			this.list = list.map((x, i) => Object.assign({ value: x.title }, x, { key: i }))
			await this.refreshInfo()
		},
		async refreshInfo() {
			let data = await this.$r(`/file/readdir?dir=` + this.cur.path)
			this.data = data.map(x => ({ title: x }))
		},
		async onadd() {
			await this.$r("/svn/add", this.add)
			this.add.show = false
			await this.refresh()
		},
		ondel() {
			this.$vux.confirm.show({
				title: "are you sure?",
				onConfirm: async () => {
					await this.$r("/svn/del?id=" + this.cur.id)
					await this.refresh()
				}
			})
		},
		treeClick(data, path) {
			console.log(data, path)
		}
	},
	mounted() {
		this.refresh()
	}
}
</script>
<style lang="less">
.page-svn {
}
</style>
