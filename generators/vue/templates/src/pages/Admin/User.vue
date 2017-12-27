<template>
	<div class="ssr">
		<div class="tools">
			<Input @input="search" icon="search" placeholder="搜索" style="width: 8rem;"></Input>
			<Button v-if="isAdmin" class="fr" @click="showFormAdd" type="primary">添加账号</Button>
		</div>
		<Table :loading="users_loading" width="100%" :columns="columns" :data="data"></Table>
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
				<FormItem prop="name">
					<Input type="text" v-model="body.name" placeholder="用户名">
            <span slot="prepend">昵称</span>
          </Input>
				</FormItem>
				<FormItem prop="account">
					<Input type="text" v-model="body.account" placeholder="账号">
            <span slot="prepend">账号</span>
          </Input>
				</FormItem>
				<FormItem prop="password">
					<Input type="text" v-model="body.password" v-random:str icon="refresh" placeholder="密码">
            <span slot="prepend">密码</span>
          </Input>
				</FormItem>
				<FormItem v-if="!body.id" prop="ssr_num">
					<Input type="text" v-model="body.ssr_num" placeholder="ss数量">
            <span slot="prepend">数量</span>
          </Input>
				</FormItem>
				<FormItem prop="level">
					<Input type="text" v-model="body.level" placeholder="级别">
            <span slot="prepend">级别</span>
          </Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" size="large" long :loading="saving" @click="save">保存</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import { methods, protocol, obfs, user_columns, user_body } from "@/utils/config";
import request from "@/utils/request";
import { mapGetters, mapState } from "vuex";
import { Button } from "iview";

export default {
  data() {
    return {
      page:1,
			sdata:false,
      showModel: false,
      saving: false,
      body: Object.assign({}, user_body),
      methods,
      protocol,
      obfs,
      columns: []
    };
  },
  async created() {
    if (!this.users.length&&!this.users_loading) {
    	this.$store.dispatch("getUsers")
    }
    if (!this.ssrs.length&&!this.ssrs_loading) {
    	this.$store.dispatch("getUsers")
    }
		this.updateColumn()
  },
  watch:{
	  users(v,o){
		  if (v&&v.length&&v!=o) this.updateColumn()
	  },
  },
  computed: {
    data: function(){
			let data = this.sdata||this.users
			data = data.slice((this.page-1)*10,this.page*10)
      return data
    },
    totalPage:function(){
      return (this.sdata||this.users).length
    },
    ...mapGetters(["isAdmin"]),
    ...mapState({
      users: state => state.ssr.users,
      users_loading: state => state.ssr.users_loading,
      nodes: state => state.ssr.nodes,
      ssrs: state => state.ssr.ssrs,
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
				this.sdata = this.users.filter(x=>{
					if((x.name+"").indexOf(v)>=0)return true;
					if((x.account+"").indexOf(v)>=0)return true;
					if((x.email+"").indexOf(v)>=0)return true;
					if((x.password+"").indexOf(v)>=0)return true;
					return false
				})
			}
		},
		updateColumn(){
			this.columns = user_columns({
				nodes:this.nodes,
				renderEdit: (h, { row }) => {
					return (
						<div>
							<Button onClick={() => this.deleteUser(row)} type="text" size="small" > 删除 </Button>
							<Button onClick={() => this.showFormUpdate(row)} type="text" size="small" > 修改 </Button>
						</div>
					);
				}
			})
		},
    showFormAdd() {
      this.showModel = true;
      this.body = Object.assign({}, user_body);
    },
    showFormUpdate(row) {
      this.showModel = true;
      let body = Object.assign({}, row);
      body.u /= 1073741824;
      body.d /= 1073741824;
      body.transfer_enable /= 1073741824;
      this.body = body;
    },
    async deleteUser(row){
      await request("/admin/userdel?id="+row.id)
      if (row.ssrs&&row.ssrs().length>0) {
        this.$store.dispatch("getSsrs")
      }
      this.$store.dispatch("getUsers")
      this.$Message.success("删除成功")
    },
    viewCode(row) {
      this.$router.push("/user/view/" + row.id);
    },
    save() {
      this.saving = true;
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            let row = await request("/admin/usersave", this.body);
            if (this.body.id<1&&this.body.ssrs&&this.body.ssrs().length>0) {
						  this.$store.dispatch("getSsrs")
            }
						this.$store.dispatch("getUsers")
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
