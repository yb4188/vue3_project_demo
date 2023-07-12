<template>
  <div>
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input
          v-model="searchData.title"
          placeholder="请输入商品名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="商品详情">
        <el-input
          v-model="searchData.introduce"
          placeholder="请输入商品详情"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据表格展示 -->
    <el-table :data="dataList.shopList" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="title" label="商品名称" width="180" />
      <el-table-column prop="introduce" label="商品列表" />
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :default-page-size="5"
      :total="searchData.count"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  watch,
} from "vue";
import { getShopList } from "../api/index";
import { shopList, listInt } from "../type/goods";
export default defineComponent({
  setup() {
    const data = reactive(new shopList());

    //页面挂载渲染数据
    onMounted(() => {
      getShops();
    });

    const getShops = async () => {
      try {
        let res: any = await getShopList();
        if ((res.code = 200)) {
          data.list = res.data;
          data.searchData.count = res.data.length;
        }
      } catch (err: any) {
        alert(err.message);
      }
    };

    //分页器页数数量改变触发
    function sizeChange(pagesize: number) {
      data.searchData.pagesize = pagesize;
    }

    //分页器页数变化
    function currentChange(page: number) {
      data.searchData.page = page;
    }

    //数据列表分割
    const dataList = reactive({
      shopList: computed(() => {
        return data.list.slice(
          (data.searchData.page - 1) * data.searchData.pagesize,
          data.searchData.page * data.searchData.pagesize
        );
      }),
    });

    //搜索按钮
    let onSubmit = () => {
      if (data.searchData.title || data.searchData.introduce) {
        let goodsList: listInt[] = [];
        if (data.searchData.title) {
          goodsList = data.list.filter((item) => {
            return item.title.includes(data.searchData.title);
          });
        } else {
          data.list.filter((item) => {
            return item.title.includes(data.searchData.introduce);
          });
        }
        data.list = goodsList;
        data.searchData.count = goodsList.length;
      } else {
        getShops();
      }
    };

    //监视属性
    watch(
      [() => data.searchData.title, () => data.searchData.introduce],
      () => {
        if (data.searchData.title === "" && data.searchData.introduce === "") {
          getShops();
        }
      }
    );

    return {
      ...toRefs(data),
      sizeChange,
      currentChange,
      dataList,
      onSubmit,
    };
  },
});
</script>

<style scoped></style>
