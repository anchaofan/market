<template>
    <div>
      <el-table :data="ordersList" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>

        <el-table-column
            prop="orderNumber"
            label="订单编号"
            width="width"
            align="center">
        </el-table-column>

        <el-table-column
            prop="pageGoodsName"
            label="商品名称"
            width="width"
            align="center">
        </el-table-column>

        <el-table-column label="图片" width="width" align="center">
          <template slot-scope="scope">
            <el-popover placement="right" trigger="hover" width="300">
              <el-image
                  slot="reference"
                  style="width: 100px; height: 100px"
                  :src="scope.row.pageGoodsPicture"
                  fit="contain">
              </el-image>
              <el-image
                  :src="scope.row.pageGoodsPicture"
                  fit="contain"
              ></el-image>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
            prop="state"
            label="订单状态"
            width="width"
            align="center"
        >
        </el-table-column>

        <el-table-column
            prop="totalPrice"
            label="订单总金额"
            width="width"
            align="center"
        >
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="350" align="center">
          <template slot-scope="{ row, $index }">
            <el-button size="mini" type="primary" @click="handleLook(row)">
              查看<i class="el-icon-coordinate"></i>
            </el-button>

            <el-button size="mini" type="danger" @click="handleDelete(row)">
              删除<i class="el-icon-remove-outline"></i>
            </el-button>

            <el-button size="mini" type="warning" @click="handleFahuo(row)">
              发货<i class="el-icon-coordinate"></i>
            </el-button>

            <el-button size="mini" type="success" @click="handleTuiHuo(row)">
              同意退货<i class="el-icon-coordinate"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--查看对话框  -->
      <el-dialog title="订单详细信息" :visible.sync="isShow1" width="50%">
        <div>
          <div style="margin-left: 250px; margin-top: 10px">
            订单编号 : &#12288;{{ this.orders.orderNumber }}
          </div>
          <div style="margin-left: 250px; margin-top: 10px">
            商品名称 : &#12288;{{ this.orders.pageGoodsName }}
          </div>
          <div style="margin-left: 250px; margin-top: 10px">
            商品图片 : &#12288;
            <el-avatar :size="80" :src="this.orders.pageGoodsPicture"></el-avatar>
          </div>
          <div style="margin-left: 250px; margin-top: 10px">
            商品单价 : &#12288;{{ this.orders.pageGoodsPrice }}
          </div>
          <div style="margin-left: 250px; margin-top: 10px">
            购买数量 : &#12288;{{ this.orders.count }}
          </div>
          <div style="margin-left: 250px; margin-top: 10px">
            订单状态 : &#12288;{{ this.orders.state }}
          </div>
          <div style="margin-left: 250px; margin-top: 10px">
            订单日期 : &#12288;{{ this.orders.orderDate }}
          </div>
          <div style="margin-left: 250px; margin-top: 10px">
            订单金额 : &#12288;{{ this.orders.totalPrice }}
          </div>
          <div style="margin-left: 250px; margin-top: 10px">
            用户昵称 : &#12288;{{ this.orders.pageUserLoginName }}
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShow1 = false">确 定</el-button>
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
      // 查看用到的订单表
      orders: {},
      //数据
      ordersList: [],
      // 控制查看对话框的显示与隐藏
      isShow1: false,
      //控制退货按钮是否出现标志
      flagTuiHuo: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化
    init() {
      //加载登录商家的的订单信息
      requests.get("/orders/getStoreList").then((res) => {
        console.log(res);
        if (res.code === "200") {
          this.ordersList = res.data;
        }
      });
    },
    //查看
    handleLook(row) {
      // row当前用户选中的行的所有信息
      this.isShow1 = true;
      this.orders = row;
    },
    //删除
    handleDelete(row) {
      // 弹框
      this.$confirm(`你确定删除订单 ${row.pageGoodsName}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定触发
          requests
            .delete("/orders/deleteByID", {
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

    //发货按钮
    handleFahuo(row) {
      if (row.state === "已付款") {
        
        //发货
        //修改goods表的商品数量
        requests
          .get("/goods/updateByID", {
            params: {
              goodsID: row.goodsID,
              count: row.count,
              state: row.state,
            },
          })
          .then((res) => {
            if (res.code === "200") {
              this.ordersList = res.data;
              this.$message.success("发货成功");
            } else {
              this.$message.error("发货失败");
            }
          });
        //修改订单表的订单状态
        requests
          .get("/orders/updateByID", {
            params: {
              ordersID: row.id,
              state: "已发货",
            },
          })
          .then((res) => {
            if (res.code === "200") {
              this.ordersList = res.data;
              this.$message.success("修改订单状态成功");
              this.init();
            } else {
              this.$message.error("修改订单状态失败");
            }
          });
        this.init();
      } else {
        this.$message.warning("您的操作有误");
        return;
      }
    },
    //确认退货
    handleTuiHuo(row) {
      console.log(row);
      if (row.state === "退货中") {
        //退货: 1.返还商品数量 2.更改订单状态 3.减少用户积分 4.减少商家金钱
        //返还商品数量
        requests
          .get("/goods/updateByID", {
            params: {
              goodsID: row.goodsID,
              count: row.count,
              state: row.state,
              storeID: row.storeID,
            },
          })
          .then((res) => {
            if (res.code === "200") {
              this.$message.success("商品返还给商家");
            } else {
              this.$message.error("退货失败");
            }
            this.init();
          });
        //更改订单状态
        requests
          .get("/orders/updateByID", {
            params: {
              ordersID: row.id,
              state: "已退货",
            },
          })
          .then((res) => {
            if (res.code === "200") {
              this.$message.success("订单状态已更改");
            } else {
              this.$message.error("修改订单状态失败");
            }
          });
        //减少用户积分
        requests
          .get("/user/updateByID", {
            params: {
              userID: row.userID,
              score: row.totalPrice,
              state: "已退货",
              storeID: row.storeID,
            },
          })
          .then((res) => {
            if (res.code === "200") {
              this.$message.success("用户积分已扣除");
            } else {
              this.$message.error("用户积分扣除失败");
            }
          });
        this.$message.success("退货操作成功");
      } else {
        this.$message.warning("您的商品未进行退货");
        return;
      }
      this.init();
    },
  },
};
</script>

<style>

</style>