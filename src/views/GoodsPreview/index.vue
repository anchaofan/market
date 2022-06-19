<template>

    <div class="page">
      <!-- 个人中心 -->
      <div>
      <span style="margin-left: 240px">
        <el-input
            class="input_search"
            v-model="input_search"
            style="width: 450px;"
            placeholder="搜索商品">
        </el-input>
        <el-button type="primary" style="margin-left: 1px" @click="btn_search">搜索</el-button>
      </span>
      </div>

      <!-- 轮播图 -->
      <div class="block">
        <el-carousel height="350px">
          <el-carousel-item v-for="item in aimg" :key="item.src">
            <el-image :src="item.src"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!--商品列表  -->
      <div style="margin-top: 10px">
        <el-row style="margin-top: 60px; margin: auto">
          <el-descriptions :column="3" :colon="false">
            <el-descriptions-item v-for="(item, index) in goodsList" :key="index">
            <span @click="getGoods(item)">
              <el-image
                  style="width: 300px"
                  :src="item.picture"
                  fit="contain">
              </el-image>
              <br />
              <span style=" color: #1c86ee; font-size: 18px">{{ item.goodsName }}</span>
              <br />
              <span style=" color: #dc143c; font-size: 18px">原价:&#12288;{{ item.oprice }}&#12288;</span>
              <br />
              <span style=" color: #dc143c; font-size: 18px">现价:&#12288;{{ item.cprice }}&#12288;</span>
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
      //轮播图的list
      slideshowList: [],
      // 搜索框
      input_search: "",
      aimg:[
        {src:require('/src/views/Home/imgs/1.png')},
        {src:require('/src/views/Home/imgs/2.png')},
        {src:require('/src/views/Home/imgs/3.png')},
        {src:require('/src/views/Home/imgs/4.png')},
        {src:require('/src/views/Home/imgs/5.png')},
        {src:require('/src/views/Home/imgs/6.png')},
      ]
    };
  },
  created() {
    this.slideshowLoad();
    this.goodsLoad();
    this.getUserID();
  },
  mounted(){
    this.username = window.localStorage.getItem("username");
  },
  methods: {
    // 加载所有商品
    goodsLoad() {
      requests.get("http://localhost:9090/goods/findAll").then((res) => {
        console.log(res);
        this.goodsList = res;
      });
    },
    // 加载轮播图
    slideshowLoad() {
      requests.get("http://localhost:9090/goods/findSlideshow").then((res) => {
        if (res.code === "200") {
          this.slideshowList = res.data;
        }
      });
    },
    // 初始化个人id
    getUserID() {
      let u = JSON.parse(window.localStorage.getItem("user"));
      console.log(u);
      window.localStorage.setItem("loginName", u.loginName);
      window.localStorage.setItem("id", u.id);
    },
    // 去个人中心按钮
    goMyCenter() {
      this.$router.push("/mycenter");
    },
    // 搜索按钮
    btn_search() {
      this.$router.push({
        name: "search",
        query: { goodsName: this.input_search },
      });
    },
    // 去注册商家按钮
    goRegisterStore() {
      this.$router.push("/registerstore");
    },
    // 商品详细信息
    getGoods(res) {
      this.$router.push({
        name: "goodsallmessage",
        query: { goods: res },
      });
    },
    // 跳转到购物车
    goCart() {
      this.$router.push("/myCart");
    },
    //跳转到订单
    goMyOrders() {
      this.$router.push("/myOrders");
    },
    // 退出登录
    out(){
      this.$router.push("/login");
    },
    home(){
      this.$router.push("/home")
    }
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

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