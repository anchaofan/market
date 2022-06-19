<template>
    <div class="page">
      <el-card class="box-card">

        <div style="margin-left: 50px; margin-top: 50px">
          <span>店铺名称： </span>
          <br>
          <el-input
              v-model="registerStore.storeName"
              style="width: 350px; margin-left: 10%; margin-top: 15px">
          </el-input>
        </div>

        <div style="margin-top: 50px; margin-left: 50px">
          <span>营业执照： </span>
          <el-upload
              style="margin-top: 20px; margin-left: 50px"
              class="upload-demo"
              drag
              action="http://localhost:9090/file/upload"
              multiple
              :on-success="load_p1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

          </el-upload>
        </div>

        <div style="margin-top: 50px; margin-left: 50px">
          <span>店长身份证照： </span>
          <el-upload
              style="margin-top: 20px; margin-left: 50px"
              class="upload-demo"
              drag
              action="http://localhost:9090/file/upload"
              multiple
              :on-success="load_p2">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

          </el-upload>
        </div>
        <div style="margin-top: 30px;">
          <el-radio v-model="agree" label="1" style="margin-left: 30%">我已经阅读了协议并同意</el-radio>
          <br/>
          <el-button type="warning" @click="openStore" style="margin-left: 37%; margin-top: 10px">确认开店</el-button>
        </div>
      </el-card>

    </div>

</template>

<script>
import requests from "@/api/request";
export default {
  name: "",
  data() {
    return {
      registerStore: {
        storeName: "",
        storePicture: "",
        IDNumberPicture: "",
        userID: 999,
      },
      agree: "999",
    };
  },
  methods: {
    openStore() {
      this.registerStore.userID = window.localStorage.getItem("id");
      if (this.agree !== "1") {
        this.$message.error("请勾选同意协议");
      } else if (this.registerStore.registerStoreName === "") {
        this.$message.error("店名不能为空");
      } else if (this.registerStore.registerStorePicture === "") {
        this.$message.error("营业执照不能为空");
      } else if (this.registerStore.IDNumberPicture === "") {
        this.$message.error("身份证件照不能为空");
      } else if (this.registerStore.userID === 999) {
        this.$message.error("小店是谁开的呢？");
      } else {
        requests.post("/store/addStore", this.registerStore).then((res) => {
          console.log(res);
          if (res.code === "200") {
            this.$router.push("/home");
            this.$message.success("店铺注册成功");
          } else {
            this.$message.error("店铺注册失败");
          }
        });
      }
    },
    load_p1(res) {
      this.registerStore.storePicture = res;
    },
    load_p2(res) {
      this.registerStore.IDNumberPicture = res;
    },
    goHome(){
      this.$router.push("/home")
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: auto;
  width: 600px;
  background-color: #d3dce6;
}

</style>