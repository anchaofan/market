<template>
  <div>
    <div class="title">欢迎来到商家界面</div>
    <div>
      <el-container style="height: 100vh; border: 1px solid #87CEFA">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

          <el-menu :default-openeds="['1', '2']" :router= true active-text-color="#66ccff"
                   style="height:100%;">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-user-solid"></i>商家管理</template>
              <el-menu-item-group>
                <el-menu-item index="storeManagement">订单管理</el-menu-item>
                <el-menu-item index="goodsManagement">商品管理</el-menu-item>
                <el-menu-item index="releasegoods">发布商品</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>

          <el-main>
            <router-view/>
          </el-main>

        </el-container>
      </el-container>
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
    this.username = window.localStorage.getItem("loginName");
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
</style>