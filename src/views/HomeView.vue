<template>
  <el-select
    v-model="selectedName"
    @change="loadUserPosts"
    placeholder="Select User"
    clearable
  >
    <el-option
      v-for="item in usersForSelect"
      :key="item.id"
      :label="item.label"
      :value="item.name"
    />
  </el-select>
  <el-table
    :data="posts"
    @row-click="watchPost($event)"
    stripe
    style="width: 100%"
  >
    <el-table-column prop="title" label="Title" min-width="35%" />
    <el-table-column prop="body" label="Post" min-width="65%" />
  </el-table>
</template>

<script>
import { ref } from "vue";
import { loadUsers } from "./api";
import { loadPosts } from "./api";

export default {
  name: "HomeView",
  components: {},

  data() {
    return {
      selectedName: ref(""),
      usersForSelect: [],
      users: [],
      posts: [],
    };
  },

  created: async function () {
    this.users = await loadUsers();
    this.pushUser(this.users);

    const allPosts = await loadPosts();
    this.pushPost(allPosts);
  },

  watch: {
    async selectedName() {
      if (this.selectedName === "") {
        const posts = await loadPosts();
        this.pushUser(posts);
      }
    },
  },

  methods: {
    loadUserPosts() {
      this.users.forEach(async (element) => {
        if (this.selectedName === element.name) {
          const userPosts = await loadPosts(`userId=${element.id}`);
          this.pushPost(userPosts);
        }
      });
    },

    pushUser(arr) {
      arr.forEach((element) => {
        this.usersForSelect.push({
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
          userId: element.userId,
          title: element.title[0].toUpperCase() + element.title.slice(1),
          body: element.body[0].toUpperCase() + element.body.slice(1),
        });
      });
    },

    watchPost(event) {
      const user = this.users.find((element) => element.id === event.userId);
      this.$router.push({
        name: "info",
        params: { user: JSON.stringify(user), post: JSON.stringify(event) },
      });
    },
  },
};
</script>
