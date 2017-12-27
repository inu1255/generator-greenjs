<template>
  <div class="form" v-if="false">
      <div class="header">
          <h6>注册，然后变成一只猫</h6>
      </div>
      <Form ref="form" :model="body" :rules="rule">
        <FormItem prop="name">
            <Input type="text" v-model="body.name" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="email">
            <Input type="text" v-model="body.email" placeholder="邮箱">
                <Icon type="ios-email-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="code">
            <Input type="text" v-model="body.code" placeholder="验证码">
                <Button @click="sendCode" slot="append">获取验证码</Button>
            </Input>
        </FormItem>
        <FormItem prop="pass">
            <Input type="password" v-model="body.pass" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="repass">
            <Input type="password" v-model="body.repass" placeholder="重复密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button class="login" type="primary" @click="login('form')">注册</Button>
        </FormItem>
      </Form>
  </div>
  <div class="form" v-else>
    <h1>暂未开放注册</h1>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Register",
  data() {
    return {
      body: {
        name: "",
        email: "",
        code: "",
        pass: "",
        repass: ""
      },
      rule: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { pattern: /[^@]+@([^\.]+\.)+[^\.]+/, message: "邮箱格式不正确", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { type: "string", min: 6, message: "密码不少于6位", trigger: "blur" }
        ],
        code: [ { required: true, message: "请输入验证码", trigger: "blur" } ],
        repass: [
          { required: true, message: "请重复密码", trigger: "blur" },
          { validator:(r,v,cb)=>cb(this.body.pass==v&&undefined), message: "密码不一致", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    register(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          this.$store.dispatch("register", this.body);
        }
      });
    },
    sendCode:_.debounce(async function(){
      await request("/user/send-code?title="+this.body.email)
      this.$Message.success("发送成功")
      // TODO: time
    })
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
