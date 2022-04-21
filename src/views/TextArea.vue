<template>
  <div class="textarea">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>

      <el-form-item prop="body">
        <el-input v-model="ruleForm.body" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Create</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "InfoViev",

  data() {
    return {
      ruleForm: ref({
        title: "",
        body: "",
        email: "",
      }),

      rules: {
        email: [
          {
            required: true,
            message: "Введите Email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Введите корректный Email",
            trigger: ["blur", "change"],
          },
        ],
        title: [
          {
            required: true,
            message: "Введите заголовок",
            trigger: "blur",
          },
          {
            min: 3,
            max: 50,
            message: "Длина заголовка не менее 3 и не более 50 символов",
            trigger: "blur",
          },
        ],
        body: [
          {
            required: true,
            message: "Введите сообщение",
            trigger: "blur",
          },
          {
            min: 20,
            max: 1000,
            message: "Длина сообщени не менее 20 и не более 1000 символов",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    submitForm(formEl) {
      this.$refs[formEl].validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>
