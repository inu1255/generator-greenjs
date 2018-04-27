<template>
	<div class="main">
		<Subscribe></Subscribe>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Subscribe from "./Subscribe";

export default {
  name: "Main",
  props: ["name", "notice"],
  computed:{
    ...mapGetters(["logined"])
  },
  components:{
	  Subscribe
  }
};
</script>

<style lang="less" scoped>
.main {
  h1 {
    font-weight: 700;
    font-size: 3.5em;
    line-height: 1.15;
    margin-bottom: 30px;
  }
  h4 {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;
    font-size: 1.714em;
    margin-top: 30px;
    margin-bottom: 15px;
  }
}
</style>

