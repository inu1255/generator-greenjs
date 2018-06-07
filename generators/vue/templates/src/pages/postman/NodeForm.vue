<template>
	<div class="page-node-form">
		<i-form :form="add" :params="params" label-width="100px">
			<el-form-item>
				<el-button type="primary" @click="addNode">提交</el-button>
			</el-form-item>
		</i-form>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "NodeForm",
	data() {
		return {
			add: {
				title: "",
				uri: "",
				method: "",
				params: "",
				code: "",
				idx: "",
			},
			data: {

			},
			params: {
				"title": {
					"rem": "结点名称"
				},
				"uri": {
					"rem": "API地址"
				},
				"method": {
					"rem": "GET/POST",
					"enum": [
						"GET",
						"POST"
					]
				},
				"params": {
					"rem": "参数"
				},
				"code": {
					"rem": "代码"
				},
				"idx": {
					"rem": "顺序"
				},
			},
		}
	},
	computed: {
		...mapState({
			nodes: state => state.postman.nodes,
		}),
		cid() {
			return +this.$route.params.cid
		},
		tid() {
			return +this.$route.params.tid
		},
		nid() {
			return +this.$route.params.nid
		}
	},
	methods: {
		...mapActions(["getPostmanNodes"]),
		async addNode() {
			if (this.add.id)
				await this.$post("/postman/node_set", this.add)
			else
				await this.$post("/postman/node_add", this.add)
			await this.getPostmanNodes({ tid: add.tid })
		},
		async refresh(retry) {
			let nodes = this.nodes[this.tid]
			if (!this.nid) {
				this.data = Object.assign({}, this.add)
			} else {
				for (let item of nodes) {
					if (item.id == this.nid) {
						this.data = Object.assign({}, item)
						return
					}
				}
				if (retry > 0) {
					await this.getPostmanNodes({ tid: add.tid })
					this.refresh(--retry)
				}
			}
		}
	},
	watch: {
		"$route.params.cid"() {
			this.refresh(1)
		}
	},
	mounted() {
		this.refresh(1)
	}
}
</script>
<style lang="less">
@import "~@/styles/methods.less";
.page-node-form {
}
</style>
