<template>
  <div class="header">
    <div class="select">
      <el-select
        v-model="selectedName"
        @change="loadUserPosts"
        placeholder="Выберите пользователя"
        clearable
      >
        <el-option
          v-for="user in users"
          :key="user.id"
          :label="user.label"
          :value="user.name"
        />
      </el-select>
    </div>
  </div>
  <div class="container">
    <div class="posts">
      <router-link
        class="post"
        v-for="item in posts"
        :key="item.id"
        :to="{
          name: 'info',
          params: { id: `${item.id}`, transitionInfo: true },
        }"
      >
        <div class="title">{{ item.title }}</div>
        <div class="body">{{ item.body }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { loadUsers } from "./api";
import { loadPosts } from "./api";
import { ElNotification } from "element-plus";

export default {
  name: "HomeView",

  props: ["id", "transitionHome"],

  data() {
    return {
      selectedName: ref(""),
      loading: ref(true),

      users: [],
      posts: [],
    };
  },

  created: async function () {
    const users = await loadUsers();
    this.pushUser(users);
    const userPosts = await loadPosts();
    this.pushPost(userPosts);
  },

  mounted: function () {
    if (this.transitionHome) {
      ElNotification({
        title: "Успех",
        message: "Вы перешли на страницу с постами",
        type: "success",
      });
    }
  },

  watch: {
    async selectedName() {
      if (this.selectedName === "") {
        this.loading = true;
        const allPosts = await loadPosts();
        this.pushPost(allPosts);
      }
    },
  },

  methods: {
    loadUserPosts() {
      this.loading = true;
      this.users.forEach(async (value) => {
        if (this.selectedName === value.name) {
          const userPosts = await loadPosts(`?userId=${value.id}`);
          this.pushPost(userPosts);
        }
      });
    },

    pushUser(arr) {
      arr.forEach((element) => {
        this.users.push({
          id: element.id,
          name: element.name,
          label: element.name,
        });
      });
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
      this.loading = false;
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
.header {
  display: block;
  width: 100%;
  padding: 30px 30px;
  background: #409eff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
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
