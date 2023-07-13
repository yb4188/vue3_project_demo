<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据表格展示 -->
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="changeRole(scope.row)">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { getRolesList } from "@/api";
import { rolesData } from "@/type/roles";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
export default {
  setup() {
    //创建路由对象
    const router = useRouter();
    //初始化列表
    let rolesList = reactive(new rolesData());

    //请求数据替换列表
    onMounted(() => {
      getRolesList().then((res) => {
        rolesList.roleList = res.data;
      });
    });

    //添加角色
    const addRole = () => {
      ElMessageBox.prompt("请输入添加的角色名", "关闭", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputErrorMessage: "Invalid Email",
      })
        .then(({ value }) => {
          if (value) {
            rolesList.roleList.push({
              roleId: rolesList.roleList.length + 1,
              roleName: value,
              authority: [],
            });
          }
          ElMessage({
            type: "success",
            message: `添加成功${value}`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Input canceled",
          });
        });
    };

    //权限管理
    const changeRole = (row) => {
      console.log(row);
      router.push({
        path: "auth",
        query: {
          id: row.roleId,
          authority: row.authority.join(","),
        },
      });
    };

    return {
      ...toRefs(rolesList),
      addRole,
      changeRole,
    };
  },
};
</script>

<style></style>
