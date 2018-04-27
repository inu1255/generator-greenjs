<template>
	<div class="barcode">
		<Header>
			<span slot="left" class="ion-ios-arrow-back" @click="$router.go(-1)">返回</span>
			<span>{{$route.query.title}}</span>
			<span slot="right" @click="scanPicture">从相册选择</span>
		</Header>
		<div id="bcid">
		</div>
	</div>
</template>

<script>
var scan
export default {
	mounted() {
		if (plus) {
			scan = new plus.barcode.Barcode("bcid", [plus.barcode.QR]);
			scan.onmarked = this.marked.bind(this)
			scan.start({ conserve: true, filename: '_doc/barcode/' });
		}
	},
	destroyed() {
		if (scan) {
			scan.close()
		}
	},
	methods: {
		marked(type, result, file) {
			this.$store.dispatch("sub", result)
			this.$router.go(-1)
		},
		scanPicture() {
			if (plus) {
				plus.gallery.pick(function (path) {
					plus.barcode.scan(path, this.marked.bind(this), function (error) {
						plus.nativeUI.alert('无法识别此图片');
					});
				}, function (err) {
					console.log('Failed: ' + err.message);
				});
			}
		}
	}
}
</script>

<style lang="less" scoped>
#bcid {
  margin-top: 45px;
  height: 50vh;
  background: #fff;
}
</style>
