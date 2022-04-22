<template>
  <el-select
    v-model="selectedName"
    @change="loadUserPosts"
    placeholder="Select User"
    clearable
  >
    <el-option
      v-for="user in users"
      :key="user.id"
      :label="user.label"
      :value="user.name"
    />
  </el-select>
  <div v-for="item in posts" :key="item.id">
    <router-link
      :to="{
        name: 'info',
        params: { id: `${item.id}`, transitionInfo: true },
      }"
    >
      <div class="title">{{ item.title }}</div>
      <div class="body">{{ item.body }}</div>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { loadUsers } from "./api";
import { loadPosts } from "./api";
import { ElNotification } from "element-plus";

export default {
  name: "HomeView",

  props: ["transitionHome"],

  data() {
    return {
      selectedName: ref(""),

      users: [],
      posts: [],
    };
  },

  created: async function () {
    const users = await loadUsers();
    this.pushUser(users);

    const allPosts = await loadPosts();
    this.pushPost(allPosts);
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
        const allPosts = await loadPosts();
        this.pushPost(allPosts);
      }
    },
  },

  methods: {
    loadUserPosts() {
      this.users.forEach(async (element) => {
        if (this.selectedName === element.name) {
          const userPosts = await loadPosts(`?userId=${element.id}`);
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
          title: element.title[0].toUpperCase() + element.title.slice(1),
          body: element.body[0].toUpperCase() + element.body.slice(1),
        });
      });
    },
  },
};
</script>
