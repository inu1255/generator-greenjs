<template>
  <div class="layout">
      <Menu @on-select="clickHead" mode="horizontal" theme="dark" active-name="1">
          <div class="layout-nav fl">
              <MenuItem name="/">
                <Icon type="ios-navigate"></Icon>ss-box
              </MenuItem>
              <MenuItem name="getSsrs"> 刷新账号 </MenuItem>
              <MenuItem name="getNodes"> 刷新节点 </MenuItem>
              <MenuItem v-if="isAdmin" name="getUsers"> 刷新用户 </MenuItem>
              <MenuItem v-if="isAdmin" name="upgrade"> 重启服务器 </MenuItem>
          </div>
          <div class="layout-nav fr">
              <MenuItem name="logout">
                  <span @click="logout"><Icon type="log-out"></Icon>注销</span>
              </MenuItem>
          </div>
      </Menu>
      <div class="layout-content">
          <Row>
              <Col span="4">
                <Menu @on-select="go" :active-name="$router.currentRoute.path" width="auto" :open-names="['1']">
                  <MenuItem name="/user/dashboard">
                    <Icon type="ios-navigate"></Icon> 个人中心
                  </MenuItem>
                  <MenuItem name="/user/list">
                    <Icon type="ios-people"></Icon> 账号管理
                  </MenuItem>
                  <MenuItem name="/admin/node">
                    <Icon type="earth"></Icon> 节点管理
                  </MenuItem>
                  <MenuItem v-if="isAdmin" name="/admin/user">
                    <Icon type="person"></Icon> 用户管理
                  </MenuItem>
                </Menu>
              </Col>
              <Col span="20">
              <div class="layout-content-main">
                  <router-view></router-view>
              </div>
              </Col>
          </Row>
      </div>
      <div class="layout-copy">
          2016-2017 &copy; ss-box
      </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import {mapGetters} from 'vuex'

export default {
  name: "User",
  computed:{
    ...mapGetters(["isAdmin"])
  },
  methods: {
    async logout() {
      this.$store.dispatch("logout");
    },
    go(name) {
      if (name.startsWith("/")) {
        this.$router.push(name);
      }
    },
    async clickHead(name){
      if (name==="upgrade") {
        try {
          await fetch(request.host+"/upgrade")
          this.$Message.success("重启成功")
        } catch (error) {
          this.$Message.error("重启失败")
        }
      }
      if (name.startsWith("/")) {
        this.$router.push(name);
      }
      else if (name.startsWith("get")) {
        this.$store.dispatch(name)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  .layout-nav {

    overflow: hidden;
    &.fr {
      .ivu-menu-item {
        color: #fff;
      }
    }
  }
  .layout-assistant {
    width: 300px;
    margin: 0 auto;
    height: inherit;
  }
  .layout-breadcrumb {
    padding: 10px 15px 0;
  }
  .layout-content {
    min-height: 633px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main {
    padding: 10px;
  }
  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
}
</style>
