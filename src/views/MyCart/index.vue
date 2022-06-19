<template>
    <div>
      <el-table
          :data="cartLis"
          style="width: 100%"
          @selection-change="handleChange">
        <el-table-column type="selection" width="60" align="center">
        </el-table-column>

        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column
            prop="pageName"
            label="商品名称"
            width="width"
            align="center">
        </el-table-column>

        <el-table-column label="图片" width="width">
          <template slot-scope="scope">
            <el-popover placement="right" trigger="hover" width="300">
              <el-image
                  slot="reference"
                  style="width: 100px; height: 100px"
                  :src="scope.row.pageImg"
                  fit="contain"
              ></el-image>
              <el-image :src="scope.row.pageImg" fit="contain"></el-image>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column prop="pagePrice" label="单价" width="width">
        </el-table-column>
        <el-table-column prop="buyNum" label="数量" width="width">
          <template v-slot="scope">
            <el-input-number
                v-model="scope.row.buyNum"
                :min="1"
                :max="20"
                size="mini"
                @change="changeBuyNum(scope.row)">
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="pagePrice" label="金额" width="width">
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="270">
          <template slot-scope="{ row, $index }">
            <el-button size="mini" type="danger" @click="handleDelete(row)">
              删除
              <i class="el-icon-remove-outline"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom">
        <span class="yixuan">已选商品&#12288;<span style="font-size: 25px; color: red">{{allNum }}</span>件</span>
        <span class="heji">合计(不含运费):&#12288;<span style="font-size: 25px; color: red">￥{{ allMoney }}</span></span>
        <span class="btn_jiesuan"><el-button type="danger" round @click="btn_jiesuan"><span style="font-size: 18px">结 算</span></el-button></span>
      </div>
    </div>

</template>

<script>
import requests from "@/api/request";
export default {
  data() {
    return {
      // table表用到的数据
      cartLis: [],
      //   选择总商品件数
      allNum: 0,
      //   总计价钱
      allMoney: 0,
      //选择的所有商品
      selectGoods: [],
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      //加载登录用户的购物车信息
      requests.get("/cart/getList").then((res) => {
        if (res.code === "200") {
          this.cartLis = res.data;
        }
      });
      //处理底下的总价
      this.allMoney = this.allNum.toFixed(2);
    },

    // 删除按钮
    handleDelete(row) {
      // 弹框
      this.$confirm(`你确定删除商品${row.pageName}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定触发
          requests
            .delete("/cart/deleteByID", {
              params: {
                id: row.id,
              },
            })
            .then((res) => {
              console.log(res);
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

    //选择
    handleChange(row) {
      this.allMoney = 0;
      this.allNum = 0;
      //进行计算操作
      if (row && row.length) {
        (this.selectGoods = row),
          row.forEach((item) => {
            this.allMoney += item.buyNum * item.pagePrice;
          });
        //js两位小数
        this.allMoney = this.allMoney.toFixed(2);
        this.allNum = row.length;
      }
    },
    //修改购买数量
    changeBuyNum(row) {
      requests
        .get("/cart/updateOneByID", {
          params: {
            id: row.id,
            buyNum: row.buyNum,
          },
        })
        .then((res) => {
          if (res.code === "200") {
            //改变selectGoods中的购买数量
            this.selectGoods = row;
            this.init();
          }
        });
    },
    // 跳转到主页
    goHome() {
      this.$router.push("/home");
    },
    //跳转到我的订单
    goMyOrders() {
      this.$router.push("/myOrders");
    },
    //结算按钮
    btn_jiesuan() {
      if (!this.selectGoods || !this.selectGoods.length) {
        this.$message.error("请选择需要结算的商品");
        return;
      }

      /**
       * 数据：一个goods数组，里面有goodsID和购买数量buyNum
       */
      let myData = {
        totalPrice: this.allMoney,
        carts: this.selectGoods,
      };

      requests.post("/orders/save", myData).then((res) => {
        console.log(myData)
        if (res.code === "200") {
          this.$message.success("结算成功，正在付款...");
          
          // 定时器，4秒后付款成功
          let timer = setTimeout(() => {
            this.$message.success("付款成功");
          }, 4000);
        } else {
          this.$message.error("结算失败");
        }
        this.init();
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
/* 底部 */
.bottom {
  text-align: center;
  margin-top: 30px;
}
/* 已选商品的字 */
.yixuan {
  font-size: 20px;
  color: rgb(0, 191, 255);
  text-align: center;
}
/* 合计字 */
.heji {
  font-size: 20px;
  color: rgb(0, 191, 255);
  text-align: center;
  margin-left: 100px;
}
/* 结算按钮 */
.btn_jiesuan {
  margin-left: 200px;
}

</style>