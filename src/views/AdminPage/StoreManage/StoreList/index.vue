<template>
  <div>
    <el-table :data="storeList" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="width" align="center">
      </el-table-column>

      <el-table-column prop="storeName" label="店铺名称" width="width" align="center">
      </el-table-column>

      <el-table-column prop="storeLevel" label="店铺等级" width="width" align="center">
      </el-table-column>

      <el-table-column prop="storePicture" label="营业执照" width="width" align="center">
        <!-- 展示图片用作用于插槽 ，row是回传的信息 $index是索引-->
        <template slot-scope="{ row, $index }">
          <img
            :src="row.storePicture"
            alt="加载失败"
            style="width: 80px; height: 80px"/>
        </template>
      </el-table-column>

      <el-table-column
        prop="IDNumberPicture"
        label="用户身份证照"
        width="width"
        align="center">
        <!-- 展示图片用作用于插槽 ，row是回传的信息 $index是索引-->
        <template slot-scope="{ row, $index }">
          <img
            :src="row.idnumberPicture"
            alt="加载失败"
            style="width: 80px; height: 80px"/>
        </template>
      </el-table-column>

      <el-table-column prop="userID" label="店铺所属用户" width="width" align="center">
      </el-table-column>

      <el-table-column prop="state" label="审核状态" width="width" align="center">
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="270" align="center">
        <template slot-scope="{ row, $index }">
          <el-button size="mini" type="primary" @click="handleLook(row)">查看<i class="el-icon-coordinate"></i></el-button>
          <el-button size="mini" type="warning" @click="handleChange(row)">修改<i class="el-icon-edit"></i></el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除<i class="el-icon-remove-outline"></i></el-button>
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

    <!--查看对话框  -->
    <el-dialog title="店铺信息" :visible.sync="isShow1" width="50%">
      <div>
        <div style="margin-left: 250px; margin-top: 10px">
          店铺名称&#12288;&#12288; : &#12288;&#12288;{{this.MyStore.storeName }}
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          店铺等级&#12288;&#12288; : &#12288;&#12288;{{this.MyStore.storeLevel }}
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          营业执照&#12288;&#12288; : &#12288;
          <el-avatar :size="80" :src="this.MyStore.storePicture"></el-avatar>
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          用户身份证照 : &#12288;
          <el-avatar :size="80" :src="this.MyStore.idnumberPicture"></el-avatar>
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          所属用户&#12288;&#12288; : &#12288;&#12288;{{ this.MyStore.userID }}
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          审核状态 : &#12288;&#12288;{{ this.MyStore.state }}
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShow1 = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改按钮对话框  -->
    <el-dialog title="店铺信息" :visible.sync="isShow2" width="50%">
      <div>
        <div style="margin-left: 250px; margin-top: 10px">
          头像&#12288;&#12288; : &#12288;
          <el-avatar :size="80" :src="this.MyStore.storePicture"></el-avatar>
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          店铺等级&#12288;&#12288; : &#12288;&#12288;
          <el-input
            size="small"
            v-model="storeLevel_tem"
            placeholder="修改店铺等级"
            style="width: 150px">
          </el-input>
        </div>
        
        <div style="margin-left: 250px; margin-top: 10px">
          审核状态 : &#12288;&#12288;
          <el-switch
            v-model="isState"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="change">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import requests from "@/api/request";
export default {
  name: "",
  data() {
    return {
      // 查看用到的店铺
      MyStore: {},
      // 修改
      storeLevel_tem: 0,
      // 当前页码数
      page: 1,
      //每页条数
      limit: 3,
      //总条数
      total: 20,
      //数据
      storeList: [],
      // 控制查看对话框的显示与隐藏
      isShow1: false,
      // 控制修改对话框的显示与隐藏
      isShow2: false,
      //修改是否审核
      isState: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //加载所有店铺信息
      requests
        .get("/store/page", {
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
    // 查看按钮
    handleLook(row) {
      // row当前用户选中的行的所有信息
      this.isShow1 = true;
      this.MyStore = row;
      console.log(row);
    },
    // 修改按钮
    handleChange(row) {
      this.isShow2 = true;
      this.MyStore = row;
    },
    // 删除按钮
    handleDelete(row) {
      // 弹框
      this.$confirm(`你确定删除店铺${row.storeName}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定触发
          requests
            .delete("/store/deleteByID", {
              params: {
                id: row.id,
              },
            })
            .then((res) => {
              if (res.code === "200") {
                this.init();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message.error("修改失败");
              }
            });
        })
        .catch(() => {
          // 点击取消触发
          this.$message({
            type: "warning",
            message: "已取消删除",
          });
        });
    },
    // 确定修改按钮
    change() {
      this.MyStore.storeLevel = this.storeLevel_tem;

      if (this.isState) {
        this.MyStore.state = "已审核";
      } else {
        this.MyStore.state = "未审核";
      }
      // 发请求
      requests.post("/store/updateOneByID", this.MyStore).then((res) => {
        if (res.code === "200") {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
      this.isShow2 = false;
    },
  },
};
</script>

<style>
</style>