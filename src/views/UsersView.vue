<template>
  <div>
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item label="用户昵称">
        <el-input v-model="searchData.nickName" placeholder="请输入用户" clearable />
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select
          v-model="searchData.role"
          class="m-2"
          placeholder="请选择"
          size="large"
        >
          <el-option label="全部" :value="0" />
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据表格展示 -->
    <el-table :data="usersList" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="userName" label="用户昵称" width="180" />
      <el-table-column prop="role" label="用户角色">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            v-for="item in scope.row.role"
            :key="item.role"
          >
            {{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="changeUser(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 弹出的对话框 -->
  <el-dialog v-model="isShow" title="编辑信息">
    <el-form :model="activeInfo">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="activeInfo.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select multiple v-model="activeInfo.role" placeholder="请选择角色">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="changeUserInfo"> 更改 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { getUsersList, getRolesList } from "@/api/index";
import { InitData, userInt } from "@/type/users";

export default defineComponent({
  setup() {
    onMounted(() => {
      usersList();
      rolesList();
    });

    const userAndRoleInfo = reactive(new InitData());

    const usersList = async () => {
      try {
        let res = await getUsersList();
        userAndRoleInfo.usersList = res.data;
      } catch (error) {
        alert(error);
      }
    };

    const rolesList = async () => {
      try {
        let res = await getRolesList();
        userAndRoleInfo.rolesList = res.data;
      } catch (error) {
        alert(error);
      }
    };

    //查询功能
    const onSubmit = () => {
      let searchList: userInt[] = [];
      if (userAndRoleInfo.searchData.nickName || userAndRoleInfo.searchData.role) {
        if (userAndRoleInfo.searchData.nickName) {
          searchList = userAndRoleInfo.usersList.filter((item) => {
            return item.nickName.includes(userAndRoleInfo.searchData.nickName);
          });
        }
        if (userAndRoleInfo.searchData.role) {
          searchList = userAndRoleInfo.searchData.nickName
            ? searchList
            : userAndRoleInfo.usersList;
          searchList = userAndRoleInfo.usersList.filter((item) => {
            return item.role.find((value) => {
              return value.role === userAndRoleInfo.searchData.role;
            });
          });
        }
        userAndRoleInfo.usersList = searchList;
      }
    };

    //监视数据变化 如果为空 还原列表
    watch(
      [() => userAndRoleInfo.searchData.nickName, () => userAndRoleInfo.searchData.role],
      () => {
        if (
          userAndRoleInfo.searchData.nickName === "" &&
          userAndRoleInfo.searchData.role === 0
        ) {
          usersList();
        }
      }
    );

    //编辑
    const changeUser = (row: userInt) => {
      userAndRoleInfo.activeInfo = {
        id: row.id,
        nickName: row.nickName,
        userName: row.userName,
        role: row.role.map((item: any) => {
          return item.role || item.roleId;
        }),
      };

      userAndRoleInfo.isShow = true;
    };

    //更改用户信息
    const changeUserInfo = () => {
      let obj: any = userAndRoleInfo.usersList.find(
        (item) => item.id === userAndRoleInfo.activeInfo.id
      );
      console.log(obj, 111);
      obj.nickName = userAndRoleInfo.activeInfo.nickName;
      console.log(userAndRoleInfo.activeInfo, 222);
      console.log(userAndRoleInfo.rolesList instanceof Array, 333);
      obj.role = userAndRoleInfo.rolesList.filter((value) => {
        return userAndRoleInfo.activeInfo.role.indexOf(value.roleId) !== -1;
      });
      console.log(obj.role);
      userAndRoleInfo.usersList.forEach((item, index) => {
        if (item.id === obj.id) {
          userAndRoleInfo.usersList[index] = obj;
        }
      });
      userAndRoleInfo.isShow = false;
    };
    return {
      ...toRefs(userAndRoleInfo),
      onSubmit,
      changeUser,
      changeUserInfo,
    };
  },
});
</script>

<style scoped></style>
