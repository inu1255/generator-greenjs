<template>
	<ul v-if="isArr" class="page-tree">
		<tree v-for="(child,i) in data" :key="i" :data="child" :path="path.concat([i])" :i-root="root" :load="load" :highlight-current="highlightCurrent" :draggable="draggable"></tree>
	</ul>
	<li v-else>
		<div @click="click($event)" class="page-tree-line" :class="cls" :draggable="draggable" v-drag-data="path" v-drop="drop">
			<i-icon :type="i_loading?'ion-refresh':'ion-arrow-right-b'" :rotate="open?90:0" :loading="i_loading"></i-icon>
			<node-content :node="data" :path="path"></node-content>
		</div>
		<collapse>
			<tree v-if="open&&hasChild" :data="data.children" :path="path" :i-root="root" :load="load" :highlight-current="highlightCurrent" :draggable="draggable"></tree>
		</collapse>
	</li>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "tree",
	props: {
		data: {
			type: [Object, Array],
			required: true,
		},
		highlightCurrent: Boolean,
		load: Function,
		draggable: Boolean,
		iParent: Object,
		iRoot: {},
		path: {
			type: Array,
			default() {
				return []
			}
		},
	},
	data() {
		let data = {}
		if (!this.iRoot) data.i_active = ''
		if (!this.isArr) {
			data.i_pos = 0
			data.i_loaded = false
			data.i_open = false
			data.i_dragenter = false
			data.i_loading = false
		}
		return data
	},
	computed: {
		isArr() {
			return this.data instanceof Array
		},
		hasChild() {
			return this.data.children && this.data.children.length
		},
		showIcon() {
			return this.hasChild || this.load && !this.i_loaded && !this.i_loading
		},
		self() {
			return this
		},
		root() {
			return this.iRoot || this
		},
		active() {
			return this.highlightCurrent && this.path.join(",") == this.root.i_active
		},
		cls() {
			let cls = {}
			if (this.i_dragenter) {
				cls.top = this.i_pos == 1
				cls.middle = this.i_pos == 2
				cls.bottom = this.i_pos == 3
			}
			cls.active = this.active
			cls.loading = this.loading
			cls.showIcon = this.showIcon
			return cls
		},
		open() {
			if (this.data.open == null) return this.i_open
			return this.data.open
		}
	},
	methods: {
		async click(e) {
			this.root.$emit("click", this.data, this.path)
			if (this.hasChild) {
				this.toggle()
			} else if (this.showIcon) {
				try {
					this.i_loading = true
					await this.load(this.data, this.path)
					this.i_loaded = true
					this.i_loading = false
					if (this.showIcon) this.toggle()
				} catch (error) {
					this.i_loading = false
				}
			}
			this.root.i_active = this.path.join(",")
		},
		toggle() {
			if (this.i_open && this.highlightCurrent && !this.active) return
			this.i_open = !this.i_open
			let data = this.data
			let path = this.path
			let open = this.i_open
			this.root.$emit("toggle", { data, path, open })
		},
		drop(e, data, done) {
			let percent = e.offsetY / e.target.offsetHeight
			if (percent < 0.2) {
				this.i_pos = 1
			} else if (percent < 0.8) {
				this.i_pos = 2
			} else {
				this.i_pos = 3
			}
			this.root.$emit("drop", { event: e, from: data, to: this.data })
		},
		setCurrentPath(path) {
			this.i_active = path instanceof Array ? path.join(",") : path
			return console.log(this)
			let children = this.root.$children
			for (let i of path) {
				if (!children || !children[i]) return
				children[i].i_open = true
				children = children[i].$children
			}
		},
		getNodeByPath(path) {
			console.log(this)
		}
	},
	components: {
		NodeContent: {
			props: {
				node: {
					required: true
				},
				path: {
					type: Array,
					required: true
				},
			},
			render(h) {
				const root = this.$parent.root;
				const node = this.node;
				const path = this.path;
				return (
					root.$scopedSlots.default
						? root.$scopedSlots.default({ node, path })
						: <span class="i-tree-node-title">{node.label}</span>
				);
			}
		}
	}
}
</script>
<style lang="less">
@import "~@/styles/methods.less";

.page-tree {
  list-style-type: none;
  .noselect;
  .page-tree-line {
    display: flex;
    height: 24px;
    align-items: center;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    > i {
      padding: 6px;
      font-size: 12px;
    }
    > .ion-refresh {
      color: rgba(0, 0, 0, 0.5);
    }
    > .ion-arrow-right-b {
      color: transparent;
    }
    > .i-tree-node-title {
      font-size: 14px;
    }
    &.top {
      border-top-color: @primary;
    }
    &.middle {
      background-color: @primary;
    }
    &.bottom {
      border-bottom-color: @primary;
    }
    &.showIcon {
      > .ion-arrow-right-b {
        color: @tip-color;
      }
    }
    .magic-color(#fff, #fff - @bg-color);
  }
  .page-tree {
    padding-left: 1.125rem;
  }
}
</style>
