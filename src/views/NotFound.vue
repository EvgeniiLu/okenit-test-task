<template>
  <div class="empty">
    <div>Пустая страница</div>
    <el-button type="primary" plain @click="goHome"
      >На главную страницу</el-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>

<style scoped>
.empty {
  width: 100%;
  height: 100vh;
  background: black;
  opacity: 0.8;
  font-weight: 900;
  font-size: 40px;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.empty div {
  padding-bottom: 20px;
}
</style>
