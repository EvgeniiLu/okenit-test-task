<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">К списку постов</el-menu-item>
    <el-menu-item index="2">Уведомления</el-menu-item>
  </el-menu>

  <div class="card">
    <div class="card-name"></div>
    <div class="card-email"></div>
    <div class="card-company"></div>
  </div>

  <div class="post">
    <div class="post-title"></div>
    <div class="post-body"></div>
  </div>

  <div class="comments">
    <div class="comments-name"></div>
    <div class="comments-email"></div>
    <div class="comments-body"></div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "InfoViev",

  props: {
    user: String,
    post: String,
  },

  components: {},

  data() {
    return {
      activeIndex: ref("1"),
    };
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      console.log(JSON.parse(this.user), JSON.parse(this.post));
    },
  },
};
</script>
