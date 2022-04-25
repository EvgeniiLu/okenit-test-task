<template>
  <users-posts-select
    @allposts="loadUsersPosts"
    @userposts="loadUsersPosts"
  ></users-posts-select>
  <div class="container">
    <div class="posts">
      <router-link
        class="post"
        v-for="item in posts"
        :key="item.id"
        :to="{
          name: 'info',
          params: { id: `${item.id}`, transitionFromPosts: true },
        }"
      >
        <div class="title">{{ item.title }}</div>
        <div class="body">{{ item.body }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { loadPost_s } from "./api";
import { ElNotification } from "element-plus";
import UsersPostsSelect from "./UsersPostsSelect";

export default {
  name: "UsersPosts",

  components: {
    UsersPostsSelect,
  },

  props: {
    id: String,
    transitionFromInfo: String,
  },

  data() {
    return {
      posts: [],
    };
  },

  created: async function () {
    const userPosts = await loadPost_s();
    this.pushPost(userPosts);
  },

  mounted: function () {
    if (this.transitionFromInfo) {
      ElNotification({
        title: "Успех",
        message: "Вы перешли на страницу с постами",
        type: "success",
      });
    }
  },

  methods: {
    async loadUsersPosts(data) {
      let userPosts = null;
      if (!data) {
        userPosts = await loadPost_s();
      } else {
        userPosts = await loadPost_s(`?userId=${data}`);
      }
      this.pushPost(userPosts);
    },

    pushPost(arr) {
      this.posts = [];
      arr.forEach((element) => {
        this.posts.push({
          id: element.id,
          title: element.title,
          body: element.body,
        });
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
.posts {
  position: relative;
  top: 92px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.post {
  display: inline-block;
  text-decoration: none;
  width: 50%;
  transition: 0.2s linear;
}
.post:hover {
  transform: scale(1.02);
}
.post:visited,
.post:link {
  color: inherit;
}
.title {
  font-weight: 800;
  background: #d9ecff;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
  margin: 0 5px;
  margin-top: 5px;
}
.body {
  padding: 15px;
  background: #f4f4f5;
  margin: 0 5px;
  margin-bottom: 5px;
  height: 170px;
  overflow-y: auto;
}

@media (max-width: 600px) {
  .posts {
    flex-wrap: nowrap;
    flex-direction: column;
  }
  .post {
    width: 100%;
  }
}
</style>
