<template>
  <Select :value="value" @input="change" placeholder="节点">
    <Option v-for="item in nodes" :value="item.id" :key="item.id">{{ item.name }}</Option>
  </Select>
</template>

<script>
import request from "@/utils/request";
import { mapState } from "vuex";

export default {
  props: ["value"],
  async created() {
    if (!this.nodes.length&&!this.nodes_loading) {
      this.$store.dispatch("getNodes");
    }
  },
  computed: {
    ...mapState({
      nodes: state => state.ssr.nodes,
      nodes_loading: s=>s.ssr.nodes_loading,
    })
  },
  methods: {
    change(v) {
      this.$emit("input", v);
    }
  }
};
</script>
