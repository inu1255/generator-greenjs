<template>
	<div class="i-preview">
		<div class="top">
			<button style="float:left">列表</button>
			<button style="float:right">关闭</button>
		</div>
		<img :width="width" :style="{marginTop:top}" :src="cur.src" :alt="cur.title" @load="load($event)">
		<div class="tools">
			<button @click="i.i=0">首页</button>
			<button @click="prev">上一张</button>
			<button @click="play">{{playing?"暂停":"播放"}}</button>
			<input type="number" v-model="speed" style="width:32px">
			<button @click="next">下一张</button>
			<input type="number" v-model="step" style="width:32px">
		</div>
	</div>
</template>
<script>
export default {
	props: ["data"],
	data() {
		return {
			i: this.$q({
				i: 0
			}),
			width: "100%",
			top: "0",
			playing: false,
			speed: 1,
			step: 1,
		}
	},
	computed: {
		cur() {
			return this.data[this.i.i] || {}
		},
	},
	methods: {
		next() {
			if (this.i.i < this.data.length - 1) this.i.i += this.step
		},
		prev() {
			if (this.i.i > 0) this.i.i -= this.step
		},
		load(e) {
			let img = e.target
			var ns = img.naturalWidth / img.naturalHeight
			var ws = window.innerWidth / window.innerHeight
			if (ns > ws) {
				this.width = window.innerWidth + "px"
				this.top = (window.innerHeight - (window.innerWidth / ns)) / 2 + "px"
			}
			else {
				this.width = window.innerHeight * ns + "px"
				this.top = 0;
			}
		},
		play() {
			this.playing = !this.playing
			let hander = () => {
				if (this.playing) {
					this.next()
					setTimeout(hander, 250 / this.speed)
				}
			}
			hander()
		}
	}
}
</script>
<style lang="less">
.i-preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  .top {
    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
  }
  .tools {
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>
