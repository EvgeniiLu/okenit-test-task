<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">К списку постов</el-menu-item>
    <el-menu-item index="2">Информация о посте</el-menu-item>
  </el-menu>

  <div class="card" v-if="user">
    <div class="card-name">{{ user.name }}</div>
    <div class="card-email">{{ user.email }}</div>
    <div class="card-company">{{ user.company.name }}</div>
  </div>

  <div class="post" v-if="post">
    <div class="post-title">{{ post.title }}</div>
    <div class="post-body">{{ post.body }}</div>
  </div>

  <div class="comments">
    <div class="comments-name"></div>
    <div class="comments-email"></div>
    <div class="comments-body"></div>
  </div>
</template>
<script>
import { ref } from "vue";
import { loadPosts } from "./api";
import { loadUsers } from "./api";

export default {
  name: "InfoViev",

  data() {
    return {
      activeIndex: ref("2"),
      user: undefined,
      post: undefined,
    };
  },

  created: async function () {
    this.post = await loadPosts(`/${this.$route.path.match(/\d+/g)[0]}`);
    this.user = await loadUsers(`/${this.post.userId}`);
  },

  methods: {
    handleSelect(key) {
      if (key === "1") this.$router.push({ name: "home" });
    },
  },
};
</script>
