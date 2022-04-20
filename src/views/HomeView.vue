<template>
  <el-select
    v-model="selectedName"
    @change="loadUserPosts"
    placeholder="Select User"
    clearable
  >
    <el-option
      v-for="item in users"
      :key="item.name"
      :label="item.label"
      :value="item.name"
    />
  </el-select>
  <el-table :data="posts" @row-click="open($event)" stripe style="width: 100%">
    <el-table-column prop="title" label="Title" style="width: 50%" />
    <el-table-column prop="body" label="Post" style="width: 50%" />
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
      users: [],
      posts: [],
    };
  },

  created: async function () {
    const userList = await loadUsers();
    const allPosts = await loadPosts();
    this.pushUserFunc(userList);
    this.pushPostFunc(allPosts);
  },

  watch: {
    async selectedName() {
      if (this.selectedName === "") {
        const posts = await loadPosts();
        this.pushPostFunc(posts);
      }
    },
  },

  methods: {
    loadUserPosts() {
      this.users.forEach(async (element) => {
        if (this.selectedName === element.name) {
          const userPosts = await loadPosts(`userId=${element.id}`);
          this.pushPostFunc(userPosts);
        }
      });
    },

    pushUserFunc(arr) {
      arr.forEach((element) => {
        this.users.push({
          id: element.id,
          name: element.name,
          label: element.name,
        });
      });
    },

    pushPostFunc(arr) {
      this.posts = [];
      arr.forEach((element) => {
        this.posts.push({
          userId: element.userId,
          title: element.title,
          body: element.body,
        });
      });
    },

    open(e) {
      this.$router.push("/about");
      console.log(e);
    },
  },
};
</script>
