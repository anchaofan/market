// 商家后台管理主页--商品管理
<template>
    <div>
      <el-table :data="goodsList" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>

        <el-table-column
            prop="goodsName"
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
                  :src="scope.row.picture"
                  fit="contain"
              ></el-image>
              <el-image
                  :src="scope.row.picture"
                  fit="contain"
              ></el-image>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column prop="oprice" label="原价" width="width" align="center">
        </el-table-column>
        <el-table-column prop="cprice" label="现价" width="width" align="center">
        </el-table-column>
        <el-table-column
            prop="goodsNum"
            label="数量"
            width="width"
            align="center">
        </el-table-column>

        <el-table-column prop="state" label="状态" width="width" align="center">
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="350" align="center">
          <template slot-scope="{ row, $index }">
            <el-button size="mini" type="success" @click="handleShangJia(row)"
            >上架<i class="el-icon-edit"></i
            ></el-button>
            <el-button size="mini" type="danger" @click="handleXiaJia(row)"
            >下架<i class="el-icon-edit"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

</template>

<script>
import requests from "@/api/request";
export default {
  data() {
    return {
      goodsList: [],
      // 修改用到的商品
      goods: {},
    };
  },
  mounted() {
    this.init();
  },

  methods: {

    //初始化
    init() {
      //加载登录商家的的商品信息
      requests.get("/goods/getGoodsList").then((res) => {
        if (res.code === "200") {
          this.goodsList = res.data;
        }
      });
    },
    //上架操作
    handleShangJia(row) {
      // 2是已审核，3是未上架
      if (row.goodsTypeId === 2 || row.goodsTypeId === 3) {
        this.goods = row;
        this.goods.goodsTypeId = 4;

        requests.post("/goods/updateOneByID", this.goods).then((res) => {
          console.log(res);
          if (res.code === "200") {
            this.$message.success("上架成功");
          } else {
            this.$message.error("上架失败");
          }
        });
        this.init();
      } else {
        this.$message.error("您的商品审核状态有误");
        return;
      }
    },
    // 下架操作
    handleXiaJia(row) {
      console.log(row);
      // 4是已上架，3是未上架
      if (row.goodsTypeId === 4) {
        this.goods = row;
        this.goods.goodsTypeId = 3;

        requests.post("/goods/updateOneByID", this.goods).then((res) => {
          console.log(res);
          if (res.code === "200") {
            this.$message.success("下架成功");
          } else {
            this.$message.error("下架失败");
          }
        });
        this.init();
      } else {
        this.$message.error("您的商品审核状态有误");
        return;
      }
    },
  },
};
</script>

<style>

</style>