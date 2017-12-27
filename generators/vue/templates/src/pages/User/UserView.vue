<template>
	<div v-if="info.node.ip" class="dashboard">
		<Card style="width:300px">
			<p slot="title">
				<Icon type="information-circled"></Icon> 连接信息
			</p>
			<ul>
				<li>
					<span class="h">服务器ip:</span>
					<span>{{info.node.ip}}</span>
				</li>
				<li>
					<span class="h">远程端口:</span>
					<span>{{info.port}}</span>
				</li>
				<li>
					<span class="h">密码:</span>
					<span>{{info.passwd}}</span>
				</li>
				<li>
					<span class="h">加密方法:</span>
					<span>{{info.method}}</span>
				</li>
				<li>
					<span class="h">协议:</span>
					<span>{{info.protocol}}</span>
				</li>
				<li>
					<span class="h">协议参数:</span>
					<span>{{info.protocol_param}}</span>
				</li>
				<li>
					<span class="h">混淆:</span>
					<span>{{info.obfs}}</span>
				</li>
				<li>
					<span class="h">混淆参数:</span>
					<span>{{info.obfs_param}}</span>
				</li>
			</ul>
		</Card>
		<Card v-if="info.node.ip" style="width:300px">
			<p slot="title">
				<Icon type="qr-scanner"></Icon> 二维码
			</p>
			<div>
				<VueQr :dotScale="1" :size="200" :text="qrcode"></VueQr>
				<span>{{qrcode}}</span>
			</div>
		</Card>
		<Card style="width:300px">
			<p slot="title">
				<Icon type="ios-timer"></Icon> 过期时间
			</p>
			<h1>
				<span>{{info.expired_at|date}}</span>
			</h1>
		</Card>
		<Card style="width:300px">
			<p slot="title">
				<Icon type="arrow-swap"></Icon> 流量
			</p>
			<h1>
				<span>{{info.u+info.d|traffic}}</span>/
				<span>{{info.transfer_enable|traffic}}</span>
			</h1>
		</Card>
	</div>
</template>

<script>
import request from "@/utils/request";
import VueQr from 'vue-qr';

export default {
  data() {
    return {
      info: {
        node: {},
        u: 0,
        d: 0,
        transfer_enable: 0
      }
    };
  },
  async created() {
    let key = this.$router.currentRoute.query.key;
    this.info = await request("/ssr/userview?key=" + key);
  },
  computed:{
	  qrcode(){
		  let {node:{ip},port,passwd,method,protocol,protocol_param,obfs,obfs_param} = this.info
		  passwd = window.btoa(passwd)
		  name = window.btoa(ip)
		  protocol_param = window.btoa(protocol_param||"")
		  obfs_param = window.btoa(obfs_param||"")
		  let text = `${ip}:${port}:${protocol}:${method}:${obfs}:${passwd}/?obfsparam=${obfs_param}&protoparam=${protocol_param}&remarks=${name}&group=c3MtYm94`
		  return "ssr://"+window.btoa(text)
	  }
  },
  components: {
	  VueQr,
  }
};
</script>

<style lang="less" scoped>
.dashboard {
  .ivu-card {
    float: left;
	margin: 0.5rem;
	div{
		text-align: center;
		word-wrap: break-word;
	}
    h1 {
      margin: 1rem;
      text-align: center;
      font-size: 2.5rem;
    }
    ul {
      span.h{
		  display: inline-block;
		  width: 4rem;
		  text-align: right;
		  margin-right: .5rem;
	  }
    }
  }
}
</style>
