<template>
	<div style="margin: 10px;overflow: hidden;">
		<masker @click.native="click" style="border-radius: 2px;" :color="color" :opacity="0.8">
			<div class="m-img" style="background-image: url('../assets/vux_logo.png');"></div>
			<div slot="content" class="m-title">
				{{item.title}}<br/>
				<span v-if="mine" class="m-time">
					<badge :style="{'background-color':mine.online>0?'#4cd137':'#f74c31'}" :text="mine.online>0?'在线':'不在线'"></badge>
					签到{{mine.num}}次&nbsp;&nbsp;&nbsp;{{mine.success_at|fromNow}}
				</span>
				<span v-else class="m-time">
					<badge v-if="item.domain" text="录制"></badge>
					<badge v-if="item.params" text="账号"></badge>
				</span>
			</div>
		</masker>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	props: ["item"],
	data() {
		return {
			colors: [
				"1abc9c",
				"3498db",
				"9b59b6",
				"34495e",
			]
		}
	},
	methods: {
		click() {
			this.$emit("click", { item: this.item, mine: this.mine })
		}
	},
	computed: {
		...mapState({
			mines: state => state.app.mines,
		}),
		color() {
			if (this.mine && !this.mine.enable) return '7D7C7F'
			return this.colors[this.item.id.length % this.colors.length]
		},
		mine() {
			for (let item of this.mines) {
				if (item.aid == this.item.id) {
					return item
				}
			}
		}
	},
}
</script>
