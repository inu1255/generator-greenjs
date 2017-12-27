<template>
  <Select :value="value" @input="change" placeholder="用户">
    <Option v-for="item in users" :value="item.id" :key="item.id">{{ item.name }}</Option>
  </Select>
</template>

<script>
import request from "@/utils/request";
import { mapState } from "vuex";

export default {
  props: ["value"],
  async mounted() {
    if (!this.users.length && !this.users_loading) {
      this.$store.dispatch("getUsers");
    }
  },
  computed: {
    ...mapState({
      users: state => state.ssr.users,
      users_loading: state => state.ssr.users_loading,
    })
  },
  methods: {
    change(v) {
      this.$emit("input", v);
    }
  }
};
</script>
