<template>
  <div>
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="loginName" label="用户名" width="width" align="center">
      </el-table-column>
      <el-table-column prop="creditCard" label="银行卡号" width="width" align="center">
      </el-table-column>
      <el-table-column prop="headPhoto" label="头像" width="width" align="center">
        <!-- 展示图片用作用于插槽 ，row是回传的信息 $index是索引-->
        <template slot-scope="{ row, $index }">
          <img
            :src="row.headPhoto"
            alt="加载失败"
            style="width: 80px; height: 80px"/>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="width" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="width" align="center">
      </el-table-column>
      <el-table-column prop="userType" label="审核状态" width="width" align="center">
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="270" align="center">
        <template slot-scope="{ row, $index }">
          <el-button size="mini" type="primary" @click="handleLook(row)">
            查看<i class="el-icon-coordinate"></i>
          </el-button>

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
    <el-dialog title="用户信息" :visible.sync="isShow1" width="50%">
      <div>
        <div style="margin-left: 250px; margin-top: 10px">
          头像&#12288;&#12288; : &#12288;
          <el-avatar :size="80" :src="this.user.headPhoto"></el-avatar>
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          用户名&#12288; : &#12288;&#12288;{{ this.user.loginName }}
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          银行卡号 : &#12288;&#12288;{{ this.user.creditCard }}
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          邮箱&#12288;&#12288; : &#12288;&#12288;{{ this.user.email }}
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          手机&#12288;&#12288; : &#12288;&#12288;{{ this.user.mobile }}
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          姓名&#12288;&#12288; : &#12288;&#12288;{{ this.user.userName }}
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          钱包&#12288;&#12288; : &#12288;&#12288;{{ this.user.wallet }}
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          积分&#12288;&#12288; : &#12288;&#12288;{{ this.user.score }}
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          审核状态 : &#12288;&#12288;{{ this.user.state }}
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShow1 = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改按钮对话框  -->
    <el-dialog title="用户信息" :visible.sync="isShow2" width="50%">
      <div>
        <div style="margin-left: 250px; margin-top: 10px">
          头像&#12288;&#12288; : &#12288;
          <el-avatar :size="80" :src="this.user.headPhoto"></el-avatar>
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          钱包&#12288;&#12288; : &#12288;&#12288;
          <el-input
            size="small"
            v-model="wallet_tem"
            placeholder="修改钱包"
            style="width: 150px">
          </el-input>
        </div>
        <div style="margin-left: 250px; margin-top: 10px">
          积分&#12288;&#12288; : &#12288;&#12288;
          <el-input
            size="small"
            v-model="score_tem"
            placeholder="修改积分"
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
      // 查看用到的用户
      user: {},
      // 修改
      wallet_tem: 0.0,
      score_tem: 0.0,
      // 当前页码数
      page: 1,
      //每页条数
      limit: 3,
      //总条数
      total: 20,
      //数据
      userList: [],
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
      //加载所有用户信息
      requests
        .get("/user/page", {
          params: {
            pageNum: this.page,
            pageSize: this.limit,
          },
        })
        .then((res) => {
          console.log(res);
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

    // 查看按钮
    handleLook(row) {
      // row当前用户选中的行的所有信息
      this.isShow1 = true;
      this.user = row;
    },
    // 修改按钮
    handleChange(row) {
      this.isShow2 = true;
      this.user = row;
    },
    // 删除按钮
    handleDelete(row) {
      // 弹框
      this.$confirm(`你确定删除用户${row.loginName}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定触发
          requests.delete("/user/deleteByID", {
            params:{
              "id": row.id
            }
          }).then((res) => {
            if (res.code === "200") {
              this.init();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message.error("删除失败");
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
      this.user.wallet = this.wallet_tem;
      this.user.score = this.score_tem;
      if (this.isState) {
        this.user.state = 1;
      } else {
        this.user.state = 0;
      }
      // 发请求
      requests.post("http://localhost:9090/user/updateOneByID", this.user).then((res) => {
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