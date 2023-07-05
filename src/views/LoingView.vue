<template>
  <div class="loginPage">
    <!-- 饿了么表单组件 -->
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h2 class="loginTitle">后台管理系统</h2>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="ruleForm.username"
          type="password"
          autocomplete="off"
          class="loginForm"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
          class="loginForm"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="loginBtn"
          >登录</el-button
        >
        <el-button @click="resetForm(ruleFormRef)" class="loginBtn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
// 引入 loginTs限制
import { loginData } from "../type/login";

export default defineComponent({
  setup() {
    console.log(new loginData());

    const data = reactive(new loginData());
    console.log(data);

    const rules = reactive({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 6, message: "用户名长度为3-6", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 8, max: 16, message: "密码长度为8-16", trigger: "blur" },
      ],
    });
    return {
      ...toRefs(data),
      rules,
    };
  },
});
</script>

<style scoped lang="scss">
.loginPage {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg");
  padding: 1px;
  text-align: center;
  .demo-ruleForm {
    width: 500px;
    height: 230px;
    background-color: whitesmoke;
    border-radius: 30px;
    margin: 150px auto;
  }
  .loginTitle {
    padding: 15px;
    color: aquamarine;
    opacity: 0.8;
  }
  .loginForm {
    width: 80%;
  }
  .loginBtn {
    width: 35%;
  }
}
</style>
