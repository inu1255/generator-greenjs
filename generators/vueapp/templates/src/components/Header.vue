<template>
	<nav class="easy-header fixed">
		<div class="color left"><slot name="left"></slot></div>
		<div class="color right"><slot name="right"></slot></div>
		<div class="title"><slot></slot></div>
	</nav>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
.easy-header{
	height: 44px;
	line-height: 44px;
	background: rgba(255, 255, 255, .9);
	border-bottom: 1px solid #ccc;
	padding: 0 11px;
	z-index: 1;
	>.color{
		position: absolute;
		font-size: 14px;
	}
	>.left{
		left: 11px;
	}
	>.right{
		right: 11px;
	}
	>.title{
		text-align: center;
		color: #000;
	}
}
</style>