<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="list"
      show-checkbox
      node-key="roleId"
      :default-checked-keys="auth"
      :check-strictl="true"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <el-button type="primary" size="small" @click="changeAuth">
      确认修改
    </el-button>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { initData } from "@/type/auth";
import { getAuthList } from "@/api/index.ts";

export default defineComponent({
  setup() {
    const route = useRoute();
    const params = route.query;
    console.log(params, 999);
    const data = reactive(new initData(params.id, params.authority.split(",")));
    const authList = () => {
      return getAuthList().then((res) => {
        data.list = res.data;
        console.log(data.list);
      });
    };

    onMounted(() => {
      authList();
    });

    //修改权限
    const changeAuth = () => {
      console.log(data.treeRef.getCheckedKeys().sort( (x, y)=> x- y ));
      data.auth = data.treeRef.getCheckedKeys().sort( (x, y)=> x- y )
    };
    return {
      ...toRefs(data),
      changeAuth,
    };
  },
});
</script>

<style></style>
