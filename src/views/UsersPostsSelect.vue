<template>
  <div class="header">
    <div class="select">
      <el-select
        v-model="selectedUser"
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
</template>

<script>
import { ref } from "vue";
import { loadUser_s } from "./api";

export default {
  name: "UsersView",

  data() {
    return {
      selectedUser: ref(""),
      users: [],
    };
  },

  created: async function () {
    const users = await loadUser_s();
    users.forEach((element) => {
      this.users.push({
        id: element.id,
        name: element.name,
        label: element.name,
      });
    });
  },

  methods: {
    loadUserPosts() {
      if (this.selectedUser === "") {
        this.$emit("allposts");
      } else {
        this.users.forEach(async (value) => {
          if (this.selectedUser === value.name) {
            this.$emit("userposts", value.id);
          }
        });
      }
    },
  },
};
</script>
<style scoped>
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
</style>
