<template>
  <div class="page">
    <!-- 搜索框 -->
    <div>
      <span
        ><el-input
          class="input_search"
          v-model="goodsName"
          placeholder="搜索商品">
      </el-input>
        <el-button type="primary" style="margin-left: 1px" @click="goodsLoad">搜索</el-button>
        <el-button type="success" style="margin-left: 230px" @click="goHome">主页</el-button>
      </span>
    </div>

    <!--商品列表  -->
    <div style="margin-top: 60px">
      <el-row style="margin-top: 60px; margin: auto">
        <el-descriptions :column="3" :colon="false">
          <el-descriptions-item
            v-for="(goods, index) in goodsList"
            :key="index">
            <span @click="getGoods(goods)" style="cursor: pointer">
              <el-image
                style="width: 200px; height: 300px"
                :src="goods.picture"
                fit="contain">
              </el-image>
              <br />
              <span style="text-align: center; color: #1c86ee; font-size: 18px">{{ goods.goodsName }}</span>
              <br />
              <span style="text-align: center; color: #dc143c; font-size: 18px">原价:&#12288;{{ goods.oprice }}&#12288;</span>
              <br />
              <span style="text-align: center; color: #dc143c; font-size: 18px">现价:&#12288;{{ goods.cprice }}&#12288;</span>
            </span>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
    </div>
  </div>
</template>

<script>
import requests from "@/api/request";
export default {
  name: "",
  data() {
    return {
      goodsList: [],
      goodsName:"",
    };
  },
  created() {
    this.goodsName = this.$route.query.goodsName;
    this.goodsLoad();
  },
  methods: {
    // 加载搜索的商品
    goodsLoad() {
      requests.get("/goods/findByKeyName", {
        params:{
          goodsName: this.goodsName
        }
      }).then((res) => {
        console.log(res)
        if(res.code === "200"){
          this.goodsList = res.data;
        }
        
      });
    },
    goHome(){
      this.$router.push("/home");
    }
  },

};
</script>

<style scoped>
.page {
  max-width: 1000px;
  margin: auto;
}
.input_search {
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>