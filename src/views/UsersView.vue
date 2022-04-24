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
  <posts-view :userid="userid"></posts-view>
</template>

<script>
import { ref } from "vue";
import { loadUsers } from "./api";
import PostsView from "./PostsView";
import { ElNotification } from "element-plus";

export default {
  name: "UsersView",
  components: {
    PostsView,
  },

  props: {
    transitionUsers: String,
  },

  data() {
    return {
      selectedName: ref(""),
      userid: 0,
      users: [],
    };
  },

  created: async function () {
    const users = await loadUsers();
    this.pushUser(users);
  },

  mounted: function () {
    if (this.transitionUsers) {
      ElNotification({
        title: "Успех",
        message: "Вы перешли на страницу с постами",
        type: "success",
      });
    }
  },
  methods: {
    loadUserPosts() {
      if (this.selectedName === "") {
        this.userid = 0;
      } else {
        this.users.forEach(async (value) => {
          if (this.selectedName === value.name) {
            this.userid = value.id;
          }
        });
      }
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
