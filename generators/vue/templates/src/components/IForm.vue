<template>
	<el-form :model="form" :label-width="labelWidth">
		<el-form-item v-for="item in _params" :key="item.key" :label="item.label">
			<el-select v-if="item.enum" v-model="form.region" placeholder="请选择">
				<el-option v-for="opt in item.enum" :key="opt" :label="opt" :value="opt"></el-option>
			</el-select>
			<el-button v-else-if="item.type=='code'" @click="editCode(item)">编辑</el-button>
			<el-input v-else v-model="form[item.key]"></el-input>
		</el-form-item>
		<slot></slot>
		<el-dialog v-transfer-dom :visible.sync="code.show" :title="code.show?code.item.label:''">
			<div class="cell">
				<el-input type="textarea" v-model="code.value" :rows="20"></el-input>
			</div>
			<div class="cell tar">
				<el-button type="primary" @click="submitCode">确定</el-button>
			</div>
		</el-dialog>
	</el-form>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "IForm",
	props: ["form", "params", "labelWidth"],
	data() {
		return {
			code: {
				show: false,
				value: "",
			}
		}
	},
	computed: {
		_params() {
			let params = []
			if (this.params instanceof Array) params = this.params;
			else for (let key in this.params) {
				let v = this.params[key]
				params.push(Object.assign({}, v, { key }))
			}
			for (let param of params) {
				param.rule = []
				param.label = param.lbl || param.rem || param.key
				if (param.need)
					param.rule.push({ required: true, message: '请输入' + param.label, trigger: 'blur' })
				if (param.reg) {
					param.reg = new RegExp(param.reg)
					param.rule.push({
						validator: function (rule, value, callback) {
							if (param.reg.test(value)) callback()
							else callback(param.label + "格式错误")
						}, trigger: 'blur'
					})
				}
			}
			return params
		}
	},
	methods: {
		editCode(item) {
			this.code.show = true
			this.code.item = item
			this.code.value = this.form[this.code.item.key]
		},
		submitCode() {
			this.form[this.code.item.key] = this.code.value
			this.code.show = false
		}
	}
}
</script>
