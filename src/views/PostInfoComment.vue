<template>
  <div class="textarea">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="Email" />
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="ruleForm.name" placeholder="Заголовок" />
      </el-form-item>

      <el-form-item prop="body">
        <el-input
          v-model="ruleForm.body"
          placeholder="Сообщение"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Отправить</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "PostInfoComment",

  data() {
    return {
      ruleForm: ref({
        name: "",
        email: "",
        body: "",
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
        name: [
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
          this.$emit("add", this.ruleForm);
          this.ruleForm = {
            name: "",
            email: "",
            body: "",
          };
        }
      });
    },
  },
};
</script>
