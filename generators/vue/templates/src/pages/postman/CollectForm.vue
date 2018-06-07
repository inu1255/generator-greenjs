<template>
	<div class="page-collect-form">
		<i-form :form="data" :params="params" label-width="100px">
			<el-form-item>
				<el-button type="primary" @click="addCollect">{{data.id?'提交':'添加'}}</el-button>
			</el-form-item>
		</i-form>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "CollectForm",
	data() {
		return {
			add: {
				id: 0,
				title: "",
				root: "",
				define: "",
				methods: "",
				before_fetch: "",
				after_fetch: "",
			},
			data: {},
			params: {
				"title": {
					"rem": "项目名称"
				},
				"root": {
					"rem": "API根"
				},
				"define": {
					"rem": "API定义路径"
				},
				"methods": {
					"rem": "通用函数定义",
					"type": "code"
				},
				"before_fetch": {
					"rem": "前钩子",
					"type": "code"
				},
				"after_fetch": {
					"rem": "后钩子",
					"type": "code"
				}
			},
		}
	},
	computed: {
		...mapState({
			collects: state => state.postman.collects,
		}),
		cid() {
			return +this.$route.params.cid
		}
	},
	methods: {
		...mapActions(["getPostmanCollects"]),
		async addCollect() {
			if (this.add_collect.id)
				await this.$post("/postman/set", this.add_collect)
			else
				await this.$post("/postman/add", this.add_collect)
			await this.getPostmanCollects()
		},
		async refresh(retry) {
			let nodes = this.collects
			if (!this.cid) {
				this.data = Object.assign({}, this.add)
			} else {
				for (let item of nodes) {
					if (item.id == this.cid) {
						this.data = Object.assign({}, item)
						return
					}
				}
				if (retry > 0) {
					await this.getPostmanCollects()
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
.page-collect-form {
}
</style>