<template>
	<li class="service" @click="$router.push('/service/'+data.id)">
		<div class="head">
			<el-badge :value="data.unread" class="item">
				<img :src="data.logo||'static/favicon.ico'" alt="" srcset="">
			</el-badge>
		</div>
		<h4 class="title">{{data.name}}</h4>
		<span>{{data.brief}}</span>
	</li>
</template>

<script>
export default {
	props: ["data"]
}
</script>

<style lang="less" scoped>
.service {
  padding: 10px 0;
  display: block;
  border-bottom: 1px solid #ccc;
  min-height: 66px;
  .head {
    float: left;
    width: 66px;
    margin-right: 7px;
    height: 66px;
    img {
      width: 66px;
      height: 66px;
    }
  }
  > .title {
    line-height: 33px;
    margin: 0;
  }
}
</style>

