<template>
    <div>
      <el-table :data="ordersList" style="width: 100%" align="center">
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
                  fit="contain"
              ></el-image>
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
            align="center">
        </el-table-column>

        <el-table-column
            prop="totalPrice"
            label="订单总金额"
            width="width"
            align="center">
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="450" align="center">
          <template slot-scope="{ row, $index }">
            <el-button size="mini" type="primary" @click="handleLook(row)">
              查看<i class="el-icon-coordinate"></i>
            </el-button>

            <el-button size="mini" type="danger" @click="handleDelete(row)"
            >删除<i class="el-icon-remove-outline"></i
            ></el-button>

            <el-button size="mini" type="warning" @click="handleTuihuo(row)">
              退货<i class="el-icon-coordinate"></i>
            </el-button>

            <el-button size="mini" type="success" @click="handleQueren(row)">
              确认收货<i class="el-icon-coordinate"></i>
            </el-button>

            <el-button size="mini" type="info" @click="handlePingjia(row)">
              评价<i class="el-icon-coordinate"></i>
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

      <!--评价对话框  -->
      <el-dialog title="订单详细信息" :visible.sync="isShow2" width="50%">
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
          <div style="margin-left: 250px; margin-top: 15px">
            评价&#12288;&#12288;
            <el-rate v-model="value1" style="margin-top:10px"></el-rate>
          </div>
          <div style="margin-left: 250px; margin-top: 15px">
            评语&#12288;&#12288;
            <el-input v-model="input" placeholder="请输入评语" size="small"input></el-input>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShow2 = false">确 定</el-button>
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
      // 控制评价对话框的显示与隐藏
      isShow2: false,
      //评语
      input:'',
      //评价
      value1:{},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //加载登录用户的订单信息
      requests.get("/orders/getList").then((res) => {
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
    // 跳转到主页
    goHome() {
      this.$router.push("/home");
    },
    //退货按钮
    handleTuihuo(row) {
      if (row.state === "已完成") {
        //申请退款退货
        this.$message.success("可以退货");
        //修改订单状态
        requests
          .get("/orders/updateByID", {
            params: {
              ordersID: row.id,
              state: "退货中",
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
        
      } else {
        this.$message.warning("您的操作有误");
        return;
      }
      this.init()
      console.log(row);
    },
    //确认收货按钮
    handleQueren(row) {
      if (row.state === "已发货") {
        //如果订单状态为  已发货  可以点击确认收货
        this.$message.success("确认收货完成");
        console.log(row);
        row.state = "已完成";
        requests.post("/orders/updateStateByID", row).then((res) => {
          if (res.code === "200") {
            this.init();
          }
        });
      } else {
        this.$message.warning("您的订单还在进行中");
        return;
      }
    },
    //评价
    handlePingjia(row){
      // row当前用户选中的行的所有信息
      this.isShow2 = true;
      this.orders = row;
    },
  },
};
</script>

<style>

</style>