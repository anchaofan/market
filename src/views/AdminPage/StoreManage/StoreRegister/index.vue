<template>
  <div>
    <el-table :data="storeList" style="width: 100%" border>
      <el-table-column
        type="index"
        label="序号"
        width="100px"
        align="center">
      </el-table-column>

      <el-table-column
        prop="storeName"
        label="店铺名称"
        width="180"
        align="center">
      </el-table-column>

      <el-table-column prop="storePicture" label="营业执照" width="180px" align="center">
        <!-- 展示图片用作用域插槽 ，row是回传的信息 $index是索引-->
        <template slot-scope="{ row, $index }">
          <img
            :src="row.storePicture"
            alt="加载失败"
            style="width: 80px; height: 80px"/>
        </template>
      </el-table-column>
      <el-table-column prop="IDNumberPicture" label="用户身份证照" width="180" align="center">
        <!-- 展示图片用作用于插槽 ，row是回传的信息 $index是索引-->
        <template slot-scope="{ row, $index }">
          <img
            :src="row.idnumberPicture"
            alt="加载失败"
            style="width: 80px; height: 80px"/>
        </template>
      </el-table-column>

      <el-table-column prop="state" label="审核状态" width="width" align="center">
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button size="small" type="success" @click="handlePass(row)"
            >通过审核<i class="el-icon-edit"></i
          ></el-button>

          <el-button size="small" type="danger" @click="handleNoPass(row)"
            >不通过审核<i class="el-icon-remove-outline"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; textAlign: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<script>
import requests from "@/api/request";
export default {
  name: "",
  data() {
    return {
      // 修改用到的用户
      MyStore: {},

      // 当前页码数
      page: 1,
      //每页条数
      limit: 3,
      //总条数
      total: 20,
      //数据
      storeList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //加载所有用户信息
      requests
        .get("/store/findPageAndNoState", {
          params: {
            pageNum: this.page,
            pageSize: this.limit,
          },
        })
        .then((res) => {
          if (res.code === "200") {
            this.storeList = res.data.records;
            this.total = res.data.total;
          }
        });
    },
    // pager当前点击的页码数
    handleCurrentChange(pager) {
      // 修改参数
      this.page = pager;
      this.init();
    },
    // 页大小改变时触发
    handleSizeChange(limit) {
      // 修改参数
      this.limit = limit;
      this.init();
    },
    // 通过审核
    handlePass(row) {
      this.MyStore = row;
      this.MyStore.state = "已审核";
      // 发请求
      requests.post("/store/updateOneByID", this.MyStore).then((res) => {
        if (res.code === "200") {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    // 不通过审核
    handleNoPass(row) {
      this.MyStore = row;
      this.MyStore.state = "未审核";
      // 发请求
      requests.post("/store/updateOneByID", this.MyStore).then((res) => {
        if (res.code === "200") {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
    },
  },
};
</script>

<style>
</style>