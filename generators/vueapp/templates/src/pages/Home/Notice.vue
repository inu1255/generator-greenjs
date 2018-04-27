<template>
	<li class="notice" @click="run">
		<small :class="timeclass">{{data.create_at|datetime}}</small>
		<Card class="content" :content="data.content" :payload="data.data"></Card>
	</li>
</template>

<script>
import request from "@/utils/request";
import Card from './Card'

export default {
	props: ["data"],
	data() {
		return {
			timeclass: this.data.read_at > 0 ? "time" : 'time unread'
		}
	},
	computed: {
	},
	methods: {
		async run() {
			if (this.data.read_at < 1) {
				await request("/notice/read", {
					nids: [this.data.id]
				})
				this.data.read_at = new Date().getTime()
				this.timeclass = "time"
			}
		}
	},
	components: {
		Card
	}
}
</script>

<style lang="less" scoped>
.notice {
  padding: 8px 0;
  display: block;
  .time {
    color: gray;
    &.unread {
      color: red;
    }
  }
  .content {
    background: #fff;
    padding: 3px 5px;
    border-radius: 5px;
  }
}
</style>

