<template>
  <div>角色列表</div>
</template>

<script>
import { getRolesList } from "@/api/index";
import { RolesData } from "@/type/roles";
import { onMounted, reactive } from "vue";
export default {
  setup() {
    //定义初始化数据
    let data = reactive(new RolesData());
    //获取角色接口
    const rolesList = () => {
      getRolesList().then((res) => {
        data.rolesList = res.data;
      });
    };
    onMounted(() => {
      rolesList();
    });
    return {};
  },
};
</script>

<style lang="less" scoped></style>
