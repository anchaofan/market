<template>
  <div>
    <el-table :data="goodsList" style="width: 100%" border>
      <el-table-column prop="goodsName" label="商品名称" width="width">
      </el-table-column>
      <el-table-column prop="oprice" label="原价" width="width">
      </el-table-column>
      <el-table-column prop="cprice" label="现价" width="width">
      </el-table-column>
      <el-table-column prop="goodsNum" label="商品数量" width="width">
      </el-table-column>
      <el-table-column prop="storeId" label="所属店铺" width="width">
      </el-table-column>
      <el-table-column prop="picture" label="图片" width="width">
        <!-- 展示图片用作用于插槽 ，row是回传的信息 $index是索引-->
        <template slot-scope="{ row, $index }">
          <img
            :src="row.picture"
            alt="加载失败"
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="state" label="审核状态" width="width">
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="{ row, $index }">
          <el-button size="small" type="warning" @click="handleChange(row)">
            通过审核
            <i class="el-icon-edit"></i>
          </el-button>

          <el-button size="small" type="danger" @click="handleDelete(row)">
            不通过审核
            <i class="el-icon-remove-outline"></i>
          </el-button>
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
      // 修改
      goods:{},
      // 当前页码数
      page: 1,
      //每页条数
      limit: 3,
      //总条数
      total: 20,
      //数据
      goodsList: [],
    };
  },
    mounted() {
    this.init();
  },
  methods: {
    init() {
      //加载所有未审核的商品信息
      requests
        .get("/goods/findPageAndNoState", {
          params: {
            pageNum: this.page,
            pageSize: this.limit,
          },
        })
        .then((res) => {
          console.log(res)
          if (res.code === "200") {
            this.goodsList = res.data.records;
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
      this.goods = row;
      this.goods.goodsTypeId = 2;
      // 发请求
      requests.post("/goods/updateOneByID", this.goods).then((res) => {
        if (res.code === "200") {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    // 不通过审核按钮
    handleDelete(row) {
      this.goods = row;
      this.goods.goodsTypeId = 1;
      // 发请求
      requests.post("/goods/updateOneByID", this.goods).then((res) => {
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