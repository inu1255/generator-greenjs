<template>
	<div class="ssr">
		<div class="tools">
			<Input @input="search" icon="search" placeholder="搜索" style="width: 8rem;"></Input>
			<Button v-if="isAdmin" class="fr" @click="showFormAdd" type="primary">添加账号</Button>
		</div>
		<Table :loading="ssrs_loading" width="100%" :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="totalPage" :current="page" @on-change="changePage"></Page>
        </div>
    </div>
		<Modal v-model="showModel" width="360" @on-ok="save">
			<p slot="header" style="color:#2d8cf0;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>{{body.id?"修改账号":"添加账号"}}</span>
			</p>
			<Form ref="form" :model="body">
				<FormItem prop="mark">
					<Input type="text" v-model="body.mark" placeholder="备注"></Input>
				</FormItem>
				<FormItem v-if="isAdmin" prop="uid">
					<UserSelect type="text" v-model="body.uid"></UserSelect>
				</FormItem>
				<FormItem prop="node_id">
					<NodeSelect type="text" v-model="body.node_id"></NodeSelect>
				</FormItem>
				<FormItem prop="port">
					<Input type="text" v-model="body.port" v-random:port icon="refresh" placeholder="端口">
						<span slot="prepend">端口</span>
					</Input>
				</FormItem>
				<FormItem prop="passwd">
					<Input type="text" v-model="body.passwd" v-random:str icon="refresh" placeholder="密码">
						<span slot="prepend">密码</span>
					</Input>
				</FormItem>
				<FormItem v-if="isAdmin" prop="u">
					<Input type="text" v-model="body.u" placeholder="上传流量GB">
						<span slot="prepend">上传</span>
					</Input>
				</FormItem>
				<FormItem v-if="isAdmin" prop="d">
					<Input type="text" v-model="body.d" placeholder="下载流量GB">
						<span slot="prepend">下载</span>
					</Input>
				</FormItem>
				<FormItem v-if="isAdmin" prop="transfer_enable">
					<Input type="text" v-model="body.transfer_enable" placeholder="流量限制GB">
						<span slot="prepend">流量</span>
					</Input>
				</FormItem>
				<FormItem v-if="isAdmin" prop="speed_limit_per_user">
					<Input type="text" v-model="body.speed_limit_per_user" placeholder="网速限制(Kb/s)">
						<span slot="prepend">网速</span>
					</Input>
				</FormItem>
				<FormItem v-if="isAdmin" prop="protocol_param">
					<Input type="text" v-model="body.protocol_param" placeholder="设备数量">
						<span slot="prepend">设备</span>
					</Input>
				</FormItem>
				<FormItem v-if="isAdmin" prop="expired_at">
					<DatePicker type="date" :value="new Date(body.expired_at)" @input="v=>body.expired_at=v.getTime()" placeholder="过期时间"></DatePicker>
				</FormItem>
				<FormItem prop="method">
					<Select v-model="body.method" placeholder="加密方法">
						<Option v-for="item in methods" :value="item" :key="item">{{ item }}</Option>
					</Select>
				</FormItem>
				<FormItem prop="protocol">
					<Select v-model="body.protocol" placeholder="协议">
						<Option v-for="item in protocol" :value="item" :key="item">{{ item }}</Option>
					</Select>
				</FormItem>
				<FormItem prop="obfs">
					<Select v-model="body.obfs" placeholder="混淆">
						<Option v-for="item in obfs" :value="item" :key="item">{{ item }}</Option>
					</Select>
				</FormItem>
				<FormItem prop="obfs_param">
					<Input type="text" v-model="body.obfs_param" placeholder="混淆参数"></Input>
				</FormItem>
				<FormItem prop="enable">
					<Checkbox :value="Boolean(body.enable)" @input="v=>body.enable=v">
						<span>是否启用</span>
					</Checkbox>
				</FormItem>
				<FormItem v-if="isAdmin" prop="personal">
					<Checkbox :value="Boolean(body.personal)" @input="v=>body.personal=v">
						<span>是否私人账户</span>
					</Checkbox>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" size="large" long :loading="saving" @click="save">保存</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import { methods, protocol, obfs, ssr_columns, ssr_body } from "@/utils/config";
import request from "@/utils/request";
import NodeSelect from "./NodeSelect";
import UserSelect from "./UserSelect";
import { mapGetters, mapState } from "vuex";
import { Button } from "iview";

export default {
  data() {
    return {
			page:1,
			sdata:false,
      showModel: false,
      saving: false,
      body: Object.assign({}, ssr_body),
      methods,
      protocol,
      obfs,
      columns: []
    };
  },
  async created() {
		if (!this.ssrs.length&&!this.ssrs_loading) {
    	this.$store.dispatch("getSsrs")
		}
		this.updateColumn()
  },
  watch:{
	  isAdmin(v,o){
		  if (v!=o) this.updateColumn()
	  },
	  users(v,o){
		  if (v&&v.length&&v!=o) this.updateColumn()
	  },
	  nodes(v,o){
		  if (v&&v.length&&v!=o) this.updateColumn()
	  },
  },
  computed: {
    data: function(){
			let data = this.sdata||this.ssrs
			data = data.slice((this.page-1)*10,this.page*10)
      return data
    },
    totalPage:function(){
      return (this.sdata||this.ssrs).length
    },
    ...mapGetters(["isAdmin"]),
    ...mapState({
			ssrs: state => state.ssr.ssrs,
      ssrs_loading: state => state.ssr.ssrs_loading,
      users: state => state.ssr.users,
      nodes: state => state.ssr.nodes,
    })
  },
  methods: {
		changePage(page){
			this.page = page
		},
		search(v){
			if (!v) {
				this.sdata = false
			}else{
				this.sdata = this.ssrs.filter(x=>{
					if (this.isAdmin){
						let user = x.user||{}
						if(((user.name||user.account||user.email||x.uid)+"").indexOf(v)>=0)return true
					}
					let node = x.node||{}
					if(((node.name||node.ip||x.node_id)+"").indexOf(v)>=0)return true;
					if((x.port+"").indexOf(v)>=0)return true;
					if((x.passwd+"").indexOf(v)>=0)return true;
					return false
				})
			}
		},
		updateColumn(){
			this.columns = ssr_columns({
				isAdmin:this.isAdmin,
				users:this.users,
				nodes:this.nodes,
				renderEdit: (h, { row }) => {
					return (
						<div>
							<a href={row.link} target="__blank" > 查看 </a>
							<Button onClick={() => this.del(row)} type="text" size="small" > 删除 </Button>
							<Button onClick={() => this.showFormUpdate(row)} type="text" size="small" > 修改 </Button>
						</div>
					);
				}
			})
		},
		async del(row){
			if(window.confirm("are you sure?")){
				await request("/ssr/del?id="+row.id)
				this.$Message.success("删除成功")
				this.$store.dispatch("getSsrs")
			}
		},
    showFormAdd() {
      this.showModel = true;
      this.body = Object.assign({}, ssr_body);
    },
    showFormUpdate(row) {
      this.showModel = true;
      let body = Object.assign({}, row);
      body.u /= 1073741824;
      body.d /= 1073741824;
      body.transfer_enable /= 1073741824;
      this.body = body;
    },
    viewCode(row) {
      this.$router.push("/user/view/" + row.id);
    },
    save() {
      this.saving = true;
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            let row = await request("/ssr/save", this.body);
						this.$store.dispatch("getSsrs")
            this.showModel = false;
          } catch (error) {
            console.log(error);
          }
          this.saving = false;
        }
      });
    }
  },
  components: {
    NodeSelect,
    UserSelect
  }
};
</script>

<style lang="less" scoped>
.ssr {
  .tools {
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
}
</style>
