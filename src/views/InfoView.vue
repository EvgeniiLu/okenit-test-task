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
  <template v-if="comments">
    <div class="comments" v-for="commemt in comments" :key="commemt.id">
      <div class="comments-name">{{ commemt.name }}</div>
      <div class="comments-email">{{ commemt.email }}</div>
      <div class="comments-body">{{ commemt.body }}</div>
    </div>
  </template>
  <text-area @add="addCommentFunc"></text-area>
</template>
<script>
import { ref } from "vue";
import { loadUsers } from "./api";
import { loadPosts } from "./api";
import { loadComments } from "./api";
import { addComment } from "./api";
import TextArea from "./TextArea.vue";

export default {
  name: "InfoViev",

  components: {
    TextArea,
  },

  data() {
    return {
      user: undefined,
      post: undefined,
      comments: undefined,

      activeIndex: ref("2"),
    };
  },

  created: async function () {
    this.post = await loadPosts(`/${this.$route.path.match(/\d+/g)[0]}`);
    this.user = await loadUsers(`/${this.post.userId}`);
    this.comments = await loadComments(`?postId=${this.post.id}`);
  },

  methods: {
    handleSelect(key) {
      if (key === "1") this.$router.push({ name: "home" });
    },

    async addCommentFunc(comment) {
      comment.postId = this.post.id;
      const newComment = await addComment(comment);
      this.comments.push(newComment);
    },
  },
};
</script>
