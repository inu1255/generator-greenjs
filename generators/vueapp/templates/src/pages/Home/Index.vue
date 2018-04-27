<template>
  <div class="home-pg">
    <div class="header">
		<Header>
			<span slot="left">left</span>
			Watchdog
			<span slot="right">right</span>
		</Header>
      <div class="content-centor">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Home",
  computed:{
    ...mapGetters(["logined"])
  }
};
</script>

<style lang="less" scoped>
.home-pg {
  > .header {
    height: 100vh;
    position: relative;
    margin: 0 auto;
    background-size: cover;
    background-position: center center;
    background-image: url(../../assets/header.jpg);
    > .content-centor {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #ffffff;
      width: 100%;
    }
  }
  > .md {
    padding: 4rem;
  }
}
</style>
