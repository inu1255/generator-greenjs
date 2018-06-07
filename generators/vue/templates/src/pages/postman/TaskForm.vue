<template>
	<div class="page-task-form">
		<i-form :form="data" :params="params" label-width="100px">
			<el-form-item>
				<el-button type="primary" @click="addTask">{{data.id?'提交':'添加'}}</el-button>
			</el-form-item>
		</i-form>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "TaskForm",
	data() {
		return {
			add: {
				title: "",
			},
			data: {},
			params: {
				"title": {
					"rem": "结点名称"
				},
			},
		}
	},
	computed: {
		...mapState({
			tasks: state => state.postman.tasks,
		}),
		cid() {
			return +this.$route.params.cid
		},
		tid() {
			return +this.$route.params.tid
		}
	},
	methods: {
		...mapActions(["getPostmanTasks"]),
		async addTask() {
			if (this.add.id)
				await this.$post("/postman/task_set", this.add)
			else
				await this.$post("/postman/task_add", this.add)
			await this.getPostmanTasks({ cid: this.cid })
		},
		async refresh(retry) {
			let nodes = this.tasks[this.cid]
			if (!this.tid) {
				this.data = Object.assign({}, this.add)
			} else {
				for (let item of nodes) {
					if (item.id == this.tid) {
						this.data = Object.assign({}, item)
						console.log(this.data, this.tid)
						return
					}
				}
				if (retry > 0) {
					await this.getPostmanTasks({ cid: this.cid })
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
.page-task-form {
}
</style>
