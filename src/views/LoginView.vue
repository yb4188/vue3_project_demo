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
          type="text"
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
import { defineComponent, reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/index";
// 引入 loginTs限制
import { loginData } from "../type/login";
import type { FormInstance } from "element-plus";

export default defineComponent({
  setup() {
    const data = reactive(new loginData());
    const router = useRouter();

    const rules = reactive({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 6, message: "用户名长度为3-6", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 4, max: 12, message: "密码长度为4-12", trigger: "blur" },
      ],
    });

    //创建ref
    const ruleFormRef = ref<FormInstance>();
    //登录
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((res) => {
            if (res.data.code === 200) {
              localStorage.setItem("token", res.data.token);
              console.log(router);
              router.push("/");
            }
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    //重置
    return {
      ...toRefs(data),
      rules,
      submitForm,
      ruleFormRef,
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
