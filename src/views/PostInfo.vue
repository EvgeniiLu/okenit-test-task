<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">К списку постов</el-menu-item>
    <el-menu-item index="2">Информация о посте</el-menu-item>
  </el-menu>

  <div class="container">
    <div class="info">
      <div class="card" v-if="user">
        <div class="image"></div>
        <div class="card-name">{{ user.name }}</div>
        <div class="card-email">{{ user.email }}</div>
        <div class="card-company">{{ user.company.name }}</div>
      </div>

      <div class="post" v-if="post">
        <div class="post-title">{{ post.title }}</div>
        <div class="post-body">{{ post.body }}</div>
      </div>
    </div>

    <template v-if="comments">
      <div class="comments" v-for="commemt in comments" :key="commemt.id">
        <div class="comments-name">{{ commemt.name }}</div>
        <div class="comments-email">{{ commemt.email }}</div>
        <div class="comments-body">{{ commemt.body }}</div>
      </div>
    </template>

    <post-info-comment @add="addComment"></post-info-comment>
  </div>
</template>
<script>
import { ref } from "vue";
import { loadUser_s } from "./api";
import { loadPost_s } from "./api";
import { loadComments } from "./api";
import { sendComment } from "./api";
import PostInfoComment from "./PostInfoComment.vue";
import { ElNotification } from "element-plus";

export default {
  name: "PostInfo",

  components: {
    PostInfoComment,
  },

  props: {
    transitionFromPosts: String,
    id: String,
  },

  data() {
    return {
      user: null,
      post: null,
      comments: null,

      activeIndex: ref("2"),
    };
  },

  created: async function () {
    this.post = await loadPost_s(`/${this.$route.params.id}`);
    if (!this.post) {
      this.$router.push({
        name: "notfound",
      });
    } else {
      const [loadUser, loadComments1] = await Promise.all([
        loadUser_s(`/${this.post.userId}`),
        loadComments(`?postId=${this.post.id}`),
      ]);
      this.user = loadUser;
      this.comments = loadComments1;
    }
  },

  mounted: function () {
    if (this.transitionFromPosts) {
      ElNotification({
        title: "Успех",
        message: "Вы перешли на страницу с информацией о посте",
        type: "success",
      });
    }
  },

  methods: {
    handleSelect(key) {
      if (key === "1")
        this.$router.push({
          name: "home",
          params: { transitionFromInfo: true },
        });
    },

    async addComment(comment) {
      comment.postId = this.post.id;
      const newComment = await sendComment(comment);
      this.comments.push(newComment);
      if (newComment)
        ElNotification({
          title: "Успех",
          message: "Вы отправили сообщение",
          type: "success",
        });
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.info {
  display: flex;
  margin: 5px 0;
}
.card {
  display: inline-block;
  width: 300px;
  background: #f4f4f5;
  font-size: 16px;
  padding: 15px;
  border-radius: 15px;
  margin-right: 5px;
}

.image {
  width: 300px;
  height: 300px;
  background: url(https://i.pravatar.cc/300) center no-repeat;
  background-size: cover;
}
.card-name {
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  padding: 10px 0;
}
.card-email {
  padding-bottom: 5px;
}

.post {
  border-radius: 15px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
  background: #ecf5ff;
  font-size: 20px;
}

.post-title {
  padding: 10px;
  font-size: 25px;
  font-weight: 600;
}
.post-body {
  overflow-y: auto;
}
.comments {
  padding: 10px;
  border: 1px solid #ecf5ff;
  border-radius: 15px;
  margin-bottom: 5px;
  background: #ecf5ff;
}
.comments-name {
  font-weight: 600;
  padding-bottom: 5px;
}
.comments-email {
  padding-bottom: 5px;
}
</style>
