<template>
  <div class="dashboard">
    <Card style="width:350px">
      <p slot="title">
        <Icon type="person"></Icon> 账号<small>(在线/总数)</small>
      </p>
      <h1>{{ ssr_show }}</h1>
    </Card>
    <Card style="width:350px">
      <p slot="title">
        <Icon type="person"></Icon> 流量<small>(使用/总量)</small>
      </p>
      <h1>
        <span>{{traffic_used|traffic }}</span>/
        <span>{{traffic_total|traffic}}</span>
      </h1>
    </Card>
    <Card style="width:350px">
      <p slot="title">
        <Icon type="person"></Icon> 即将过期
      </p>
      <ul>
        <li v-for="item in this.ssrs_valid">
          <a :href="item.link" target="_blank">{{ item.mark||item.port||item.id }}</a>
          <span class="fr">{{item.expired_at|date}}</span>
        </li>
      </ul>
    </Card>
    <Card style="width:350px">
      <p slot="title">
        <Icon type="person"></Icon>已经过期
      </p>
      <ul>
        <li v-for="item in this.ssrs_expired">
          <a :href="item.link" target="_blank">{{ item.mark||item.port }}</a>
          <span class="fr">{{item.expired_at|date}}</span>
        </li>
      </ul>
    </Card>
  </div>
</template>

<script>
import request from "@/utils/request";
import { mapState } from "vuex";
import moment from "moment";

export default {
  created() {
    if (!this.ssrs.length&&!this.ssrs_loading) {
      this.$store.dispatch("getSsrs");
    }
  },
  computed: {
    ...mapState({
      ssrs: s => s.ssr.ssrs
    }),
    ssr_show() {
      if (this.ssrs) {
        // let today = moment().format("YYYY-MM-DD");
        // let valid = this.ssrs.filter(x => x.expired_at >= today).length
        let valid = this.ssrs.filter(x => (new Date().getTime()-new Date(x.update_at).getTime())<5*60000).length
        return valid + "/" + this.ssrs.length
      }
    },
    traffic_total(){
      return this.ssrs.reduce((s,x)=>s+x.transfer_enable,0)
    },
    traffic_used(){
      return this.ssrs.reduce((s,x)=>s+x.u+x.d,0)
    },
    ssrs_expired(){
      let today = moment().format("YYYY-MM-DD");
      return this.ssrs.filter(x=>x.expired_at<today).sort((a,b)=>a.expired_at>b.expired_at?-1:1).slice(0,5)
    },
    ssrs_valid(){
      let today = moment().format("YYYY-MM-DD");
      return this.ssrs.filter(x=>x.expired_at>=today).sort((a,b)=>a.expired_at>b.expired_at?1:-1).slice(0,5)
    }
  }
};
</script>

<style lang="less" scoped>
.dashboard {
  .ivu-card {
    float: left;
    margin: 0.5rem;
    h1 {
      margin: 1rem;
      text-align: center;
      font-size: 2rem;
    }
    ul {
      min-height: 104px;
    }
  }
}
</style>
