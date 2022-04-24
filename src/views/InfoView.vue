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

    <text-area @add="addCommentFunc"></text-area>
  </div>
</template>
<script>
import { ref } from "vue";
import { loadUsers } from "./api";
import { loadPosts } from "./api";
import { loadComments } from "./api";
import { addComment } from "./api";
import TextArea from "./TextArea.vue";
import { ElNotification } from "element-plus";

export default {
  name: "InfoViev",

  components: {
    TextArea,
  },

  props: ["transitionInfo", "id"],

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

  mounted: function () {
    if (this.transitionInfo) {
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
        this.$router.push({ name: "home", params: { transitionUsers: true } });
    },

    async addCommentFunc(comment) {
      comment.postId = this.post.id;
      const newComment = await addComment(comment);
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
