<template>
  <el-select
    v-model="selectedName"
    @change="loadUserPosts"
    placeholder="Select User"
  >
    <el-option
      v-for="item in users"
      :key="item.name"
      :label="item.label"
      :value="item.name"
    />
  </el-select>
  <el-table :data="posts" stripe style="width: 100%">
    <el-table-column prop="title" label="Title" width="180" />
    <el-table-column prop="body" label="Post" width="180" />
  </el-table>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
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
    userList.forEach((element) => {
      this.users.push({
        id: element.id,
        name: element.name,
        label: element.name,
      });
    });
  },

  methods: {
    loadUserPosts() {
      this.users.forEach(async (element) => {
        if (this.selectedName === element.name) {
          const userPosts = await loadPosts(`userId=${element.id}`);
          userPosts.forEach((post) => {
            this.posts.push({
              title: post.title,
              body: post.body,
            });
          });
        }
      });
    },
  },
};
</script>
