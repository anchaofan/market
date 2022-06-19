<template>
  <div>
    <el-table :data="userList" style="width: 100%" border >
      <el-table-column type="index" label="序号" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="用户名"
        width="260px"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userType"
        label="审核状态"
        width="230px"
        align="center">
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row, $index }">
          <el-button size="small" type="warning" @click="handleChange(row)">通过审核<i class="el-icon-edit"></i></el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">不通过审核<i class="el-icon-remove-outline"></i></el-button>
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
      // 当前页码数
      page: 1,
      //每页条数
      limit: 3,
      //总条数
      total: 20,
      //数据
      userList: [],
      user: {},
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      //加载所有用户信息
      requests
        .get("/user/findPageAndNoState", {
          params: {
            pageNum: this.page,
            pageSize: this.limit,
          },
        })
        .then((res) => {
          if (res.code === "200") {
            this.userList = res.data.records;
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

    // 通过审核按钮
    handleChange(row) {
      this.user = row;
      this.user.state = "1";
      // 发请求
      this.$axios.post("http://localhost:9090/user/updateOneByID", this.user).then((res) => {
        console.log(res);
        if (res.data.code === "200") {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    // 不通过审核按钮
    handleDelete(row) {
      this.user = row;
      this.user.state = "0";
      // 发请求
      this.$axios.post("http://localhost:9090/user/updateOneByID", this.user).then((res) => {
        if (res.data.code === "200") {
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