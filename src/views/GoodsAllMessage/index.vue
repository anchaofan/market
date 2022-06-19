// 我是商品详情页面
<template>
  <el-card class="box-card">
    <div class="page">
      <div class="img">
        <img
          :src="goods.picture"
          alt="加载失败"
          style="width: 400px; height: 400px; float: left"/>
      </div>
      <span><el-button type="success" style="margin-left: 530px" @click="goHome">主页</el-button></span>
      <div class="word">
        <el-descriptions
          class="desc_all"
          title=""
          :column= "1"
          style="float: left">
          <el-descriptions-item label="商品特点">
            <el-tag
              type="success"
              size="normal"
              effect="dark"
              style="margin-left: 10px">正品</el-tag>
            <el-tag
              type="danger"
              size="normal"
              effect="dark"
              style="margin-left: 5px">爆款</el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="商品名称">{{goods.goodsName }}</el-descriptions-item>
          <el-descriptions-item label="原价">{{goods.oprice }}</el-descriptions-item>
          <el-descriptions-item label="秒杀价">{{goods.cprice }}</el-descriptions-item>
          <el-descriptions-item label="库存数量">{{ goods.goodsNum }}<span>件</span></el-descriptions-item>
        </el-descriptions>
      </div>
      <!-- 加入购物车 -->
      <div class="add">
        <el-input-number v-model="num" :min="1" :max="goods.goodsNum"></el-input-number>

        <el-button type="danger" style="margin-left: 8px" @click="addCart"><i class="el-icon-shopping-cart-full"></i> 加入购物车</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import requests from "@/api/request";
export default {
  name: "",
  data() {
    return {
      goods: {},
      num: 1,
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
      goodsID: 0,
    };
  },
  mounted() {
    this.goods = this.$route.query.goods;
  },

  methods: {
    // 去主页
    goHome() {
      this.$router.push("/home");
    },
    // 加入购物车
    addCart() {
      if (!this.user.id) {
        this.$message.warning("请登录后操作");
        return;
      }
      this.goodsID = this.goods.id;
  
      requests
        .get("/cart/saveOne", {
          params: {
            goodsID: this.goodsID,
            num: this.num,
          },
        })
        .then((res) => {
          if (res.code === "200") {
            // 跳转到购物车页面
            this.$router.push("/MyCart");
            this.$message.success("加入购物车成功");
          } else {
            this.$message.error("加入购物车失败");
          }
        });
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 1000px;
  margin: auto;
}
.desc_all {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 20px;
}
.img {
  margin-top: 20px;
}
.word {
  float: left;
  margin-left: 500px;
  margin-top: 50px;
  position: absolute;
}
.add {
  float: left;
  margin-left: 520px;
  margin-top: 300px;
  position: absolute;
}
</style>