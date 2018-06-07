<template>
	<div class="page-splite">
		<div v-if="large" class="screen-lg">
			<div class="left">
				<slot name="left"></slot>
			</div>
			<div class="content">
				<slot></slot>
			</div>
		</div>
		<div v-else class="screen-sm">
			<drawer :show="show" @update:show="toggle" placement="left">
				<template slot="drawer">
					<slot name="left"></slot>
				</template>
				<div class="content">
					<slot></slot>
				</div>
			</drawer>
			<transition enter-active-class="animated fadeInLeft">
				<div v-transfer-dom v-show="!show" @click="toggle" class="v-transfer-dom left-menu">
					<i-icon type="chevron-right"></i-icon>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			show: false
		}
	},
	computed: {
		large() {
			return window.innerWidth > 768
		}
	},
	methods: {
		toggle() {
			this.show = !this.show
		}
	}
}
</script>
<style lang="less">
.v-transfer-dom.left-menu {
  position: fixed;
  left: 0;
  top: 50%;
  bottom: 50%;
}
.page-splite {
  > .screen-lg {
    > .left {
      width: 30%;
      min-height: 100vh;
      float: left;
      border-right: 1px solid #ccc;
    }
    > .content {
      width: 70%;
      margin-left: -1px;
      padding: 1rem;
      float: left;
      box-sizing: border-box;
    }
  }
  > .screen-sm {
    height: 100vh;
    .vux-drawer-body {
      > .content {
        width: 70%;
        margin-left: -1px;
        padding: 1rem;
        float: left;
        box-sizing: border-box;
      }
    }
  }
}
</style>
