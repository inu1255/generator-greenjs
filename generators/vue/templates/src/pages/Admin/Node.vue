<template>
	<div class="ssr">
		<div class="tools">
			<Input @input="search" icon="search" placeholder="搜索" style="width: 8rem;"></Input>
		</div>
		<Table :loading="ssrs_loading" width="100%" :columns="columns" :data="sdata||nodes"></Table>
		<Modal v-model="showModel" width="360" @on-ok="save">
			<p slot="header" style="color:#2d8cf0;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>{{body.id?"修改节点":"添加节点"}}</span>
			</p>
			<Form ref="form" :model="body">
				<FormItem prop="name">
					<Input type="text" v-model="body.name" placeholder="节点名"></Input>
				</FormItem>
				<FormItem prop="traffic_rate">
					<Input type="text" v-model="body.traffic_rate" placeholder="费率"></Input>
				</FormItem>
				<FormItem prop="level">
					<Input type="text" v-model="body.level" placeholder="级别"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" size="large" long :loading="saving" @click="save">保存</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import { methods, protocol, obfs, node_columns } from "@/utils/config";
import request from "@/utils/request";
import { mapGetters, mapState } from "vuex";
import { Button } from "iview";

export default {
  data() {
    return {
			sdata:false,
      showModel: false,
      saving: false,
      body: {},
      methods,
      protocol,
      obfs,
      columns: []
    };
  },
  async created() {
		if (!this.nodes.length&&!this.nodes_loading) {
    	this.$store.dispatch("getNodes")
		}
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
    ...mapGetters(["isAdmin"]),
    ...mapState({
	  ssrs: state => state.ssr.ssrs,
      ssrs_loading: state => state.ssr.ssrs_loading,
      users: state => state.ssr.users,
      nodes: state => state.ssr.nodes,
    })
  },
  methods: {
		search(v){
			if (!v) {
				this.sdata = false
			}else{
				this.sdata = this.nodes.filter(x=>{
					if((x.name+"").indexOf(v)>=0)return true;
					if((x.ip+"").indexOf(v)>=0)return true;
					if((x.desc+"").indexOf(v)>=0)return true;
					return false
				})
			}
		},
		updateColumn(){
			this.columns = node_columns({
				isAdmin:this.isAdmin,
				users:this.users,
				nodes:this.nodes,
				renderEdit: (h, { row }) => {
					return (
						<div>
							<Button onClick={() => this.del(row)} type="text" size="small" > 删除 </Button>
							<Button onClick={() => this.showFormUpdate(row)} type="text" size="small" > 修改 </Button>
						</div>
					);
				}
			})
		},
		async del(row){
			if(window.confirm("are you sure?")){
				await request("/admin/nodedel?id="+row.id)
				this.$Message.success("删除成功")
				this.$store.dispatch("getNodes")
			}
		},
    showFormUpdate(row) {
      this.showModel = true;
      let body = Object.assign({}, row);
      body.u /= 1073741824;
      body.d /= 1073741824;
      body.transfer_enable /= 1073741824;
      this.body = body;
    },
    save() {
      this.saving = true;
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            let row = await request("/admin/nodesave", this.body);
						this.$store.dispatch("getNodes")
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
