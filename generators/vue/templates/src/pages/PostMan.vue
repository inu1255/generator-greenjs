<template>
	<div class="page-post-man">
		<splite>
			<div slot="left">
				<div class="margin tac">
					<el-button @click.native="addNode([])" type="primary" size="mini">添加</el-button>
					<el-button @click.native="getPostmanCollects" type="info" size="mini">刷新</el-button>
				</div>
				<i-tree ref="tree" :data="collects_tree" @click="editNode" :load="loadTasks" node-key="key" highlight-current lazy>
					<span class="custom-tree-node" slot-scope="{ node, path }">
						<span>{{ node.label }}</span>
						<span>
							<el-button v-if="path.length<3" type="text" size="mini" @click.stop="addNode(path)">添加</el-button>
							<el-button type="text" size="mini" @click.stop="delNode(node,path)">删除</el-button>
						</span>
					</span>
				</i-tree>
			</div>
			<router-view></router-view>
		</splite>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import CollectForm from './postman/CollectForm.vue';

export default {
	data() {
		return {
			add_node: {
				title: "",
				uri: "",
				method: "",
				params: "",
				code: "",
				idx: "",
			},
			add_task: {
				title: "",
			},
			add_collect: {
				id: 0,
				title: "",
				root: "",
				define: "",
				methods: "",
				before_fetch: "",
				after_fetch: "",
			},
			url: "",
		}
	},
	computed: {
		...mapState({
			collects: state => state.postman.collects,
			tasks: state => state.postman.tasks,
			nods: state => state.postman.nods,
		}),
		...mapGetters(["collects_tree"]),
	},
	methods: {
		...mapActions(["getPostmanCollects", "getPostmanTasks", "getPostmanNodes"]),
		async loadTasks(node, path) {
			let level = path.length
			if (level == 0) {
				await this.getPostmanCollects({ loading: false })
			} else if (level == 1) {
				let collect = node.data
				await this.getPostmanTasks({ cid: collect.id, loading: false })
			} else {
				let task = node.data
				await this.getPostmanNodes({ tid: task.id, loading: false })
			}
		},
		async addNode(path) {
			path = this.$utils.mapTree(this.collects_tree, path, x => x.id)
			let level = path.length
			path = ["postman", ...path].slice(0, level)
			path[level] = 0
			this.$router.push("/" + path.join("/"))
		},
		async editNode(node, path) {
			path = this.$utils.mapTree(this.collects_tree, path, x => x.id)
			let level = path.length
			path = ["postman", ...path].slice(0, level)
			this.$router.push("/" + path.join("/"))
		},
	},
	async mounted() {
		await this.getPostmanCollects()
		let p = this.$route.params
		let path = [p.cid, p.tid, p.nid].filter(x => +x)
		this.$refs.tree.setCurrentPath(path)
	},
	components: {
		CollectForm,
	}
}
</script>
<style lang="less">
.page-post-man {
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>
