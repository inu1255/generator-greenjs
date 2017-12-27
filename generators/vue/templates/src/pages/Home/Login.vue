<template>
    <div class="form">
        <div class="header">
            <h6>回家咯~~~</h6>
        </div>
        <Form ref="form" :model="body" :rules="rule">
          <FormItem prop="title">
              <Input type="text" v-model="body.title" placeholder="用户名/邮箱">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input @on-enter="login('form')" type="password" v-model="body.password" placeholder="密码">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem>
              <Button class="login" type="primary" @click="login('form')">登录</Button>
          </FormItem>
        </Form>
    </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Login",
  data() {
    return {
      body: {
        title: "",
        pass: ""
      },
      rule: {
        title: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { type: "string", min: 6, message: "密码不少于6位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          this.$store.dispatch("login", this.body);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  width: 350px;
  display: inline-block;
  .header {
    padding: 30px 0;
  }
  .login {
    width: 100%;
  }
}
</style>
