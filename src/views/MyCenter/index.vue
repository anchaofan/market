<template>
    <div class="page">
      <el-card class="box-card">
        <div class="block">
          <el-avatar :size="80" :src="this.user.headPhoto"></el-avatar>
          <span style="float: right">
            <el-button type="success" @click="change" style="margin-top: 20px">修改资料</el-button>
          </span>
        </div>
        <el-divider content-position="center">基本信息</el-divider>
        <!-- 主体的div -->
        <div class="body">
          <div>
            <span style="width: 30px">我的钱包 :</span>
            <span style="margin-left: 50px">{{ user.wallet }}</span>
          </div>

          <br />

          <div>
            <span style="width: 10px">我的积分 :</span>
            <span style="margin-left: 50px">{{ user.score }}</span>
          </div>

          <el-divider></el-divider>
          <div>
            <span style="width: 30px">用户昵称 :</span>
            <span style="margin-left: 50px">{{ user.loginName }}</span>
            <br /><br />
          </div>

          <div>
            <span style="width: 30px">性&#12288;&#12288;别 :</span>
            <span style="margin-left: 50px">{{ user.gender }}</span>
            <br /><br />
          </div>

          <div>
            <span style="width: 30px">银行卡号 :</span>
            <span style="margin-left: 50px">{{ user.creditCard }}</span>
            <br /><br />
          </div>

          <div>
            <span style="width: 30px">邮&#12288;&#12288;箱 :</span>
            <span style="margin-left: 50px">{{ user.email }}</span>
            <br /><br />
          </div>

          <div>
            <span style="width: 30px">手机号码 :</span>
            <span style="margin-left: 50px">{{ user.mobile }}</span>
            <br /><br />
          </div>

          <div>
            <span style="width: 30px">姓&#12288;&#12288;名 :</span>
            <span style="margin-left: 50px">{{ user.userName }}</span>
            <br /><br />
          </div>
        </div>
      </el-card>
    </div>

</template>

<script>
import requests from "@/api/request";
import { null2str } from "../../../turnString";
export default {
  name: "",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      // 用户名信息
      user: {
        id: 999,
        loginName: "",
        gender: "",
        creditCard: "",
        email: "",
        mobile: "",
        userName: "",
        wallet: "",
        score: "",
        headPhoto:"",
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      let u = JSON.parse(window.localStorage.getItem("user"));
      this.user.loginName = u.loginName
      this.user.id = u.id
      window.localStorage.setItem("id",u.id)
      // 发送请求
      requests.post("/user/getByID", this.user).then((res) => {
        // 发送成功
        if (res.code === "200") {
          null2str(res.data);
          this.user = res.data;
          // 数据处理
          //处理性别
          if (res.data.gender === 1) {
            this.user.gender = "男";
          } else {
            this.user.gender = "女";
          }
          // 处理钱包 和积分
          if (res.data.wallet == "") {
            this.user.wallet = "0";
          }
          if (res.data.score == "") {
            this.user.score = "0";
          }
          // 处理 姓名 电话 邮箱 银行卡
          if (res.data.userName == "") {
            this.user.userName = "未设置";
          }
          if (res.data.mobile == "") {
            this.user.mobile = "未设置";
          }
          if (res.data.email == "") {
            this.user.email = "未设置";
          }
          if (res.data.creditCard == "") {
            this.user.creditCard = "未设置";
          }
        }
      });
    },
    // 修改资料
    change() {
       this.$router.push({name:"changeuserinfo", query:{user:this.user}});
      
    },
    //回到主页
    goHome(){
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>
.body {
  margin-left: 30px;
}
.box-card {
  margin: auto;
  width: 600px;
  background-color: #d3dce6;
}

</style>