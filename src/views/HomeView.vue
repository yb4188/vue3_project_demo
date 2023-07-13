<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header class="homeHeader">
        <el-row :gutter="20">
          <el-col :span="4"
            ><img src="../assets/logo.jpg" alt="" srcset=""
          /></el-col>
          <el-col :span="16"><h1>后台管理系统</h1></el-col>
          <el-col :span="4" class="elcol">
            <el-button type="danger" @click="logout">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            icon-menu
            class="el-menu-vertical-demo"
            :default-active="active"
            text-color="#fff"
            router
          >
            <el-menu-item
              :index="item.path"
              v-for="item of filterRouterList"
              :key="item.path"
            >
              <el-icon></el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右侧内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const routerList = router.getRoutes();

    //筛选我们要展示的二级列表
    const filterRouterList = routerList.filter((item) => {
      return item.meta.show;
    });

    //退出
    const logout = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };
    return {
      filterRouterList,
      active: route.path,
      logout,
    };
  },
});
</script>

<style scoped lang="scss">
.homeHeader {
  height: 80px;
  background-color: darkgray;
  img {
    height: 80px;
  }
  h1 {
    text-align: center;
    font-size: 40px;
    line-height: 80px;
    color: green;
  }
  h4 {
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: violet;
  }
  .elcol {
    line-height: 80px;
  }
}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}
</style>
