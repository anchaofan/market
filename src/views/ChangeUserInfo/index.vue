<template>

  <el-container>
    <el-header style="height: 100px">
      <div style="line-height: 100px; font-size: 60px; text-align: center">
        <span>修改个人信息</span>
        <div style="float: right; margin-top: -20px; height: 20px">
          <el-button type="warning" round icon="el-icon-house" @click="goHome">
            主页
          </el-button>
        </div>
      </div>
    </el-header>

    <div class="page_all">
      <div class="page">
        <el-form ref="form" :model="user" label-width="150px">
          <el-form-item label="修改头像  :" style="width: 500px; margin-top: 0px">
            <el-upload
                style="margin-top: 30px"
                class="upload-demo"
                drag
                action="http://localhost:9090/file/upload"
                multiple
                :on-success="load_success">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>

          <el-form-item label="修改昵称  :" style="width: 500px">
            <el-input
                v-model="user.loginName"
                placeholder="请输入昵称"
                style="margin-bottom: 20px">
            </el-input>
          </el-form-item>

          <el-form-item label="选择性别  :" style="width: 500px">&#12288;&#12288;
            <el-radio v-model="user.gender" label="1" style="margin-bottom: 20px">男</el-radio>
            <el-radio v-model="user.gender" label="0">女</el-radio>
          </el-form-item>

          <el-form-item label="修改银行卡  :" style="width: 500px">
            <el-input
                v-model="user.creditCard"
                placeholder="请输入银行卡"
                style="margin-bottom: 30px">
            </el-input>
          </el-form-item>

          <el-form-item label="修改邮箱  :" style="width: 500px">
            <el-input
                v-model="user.email"
                placeholder="请输入邮箱"
                style="margin-bottom: 20px">
            </el-input>
          </el-form-item>

          <el-form-item label="修改手机号  :" style="width: 500px">
            <el-input
                v-model="user.mobile"
                placeholder="请输入手机号"
                style="margin-bottom: 20px">
            </el-input>
          </el-form-item>

          <el-form-item label="修改姓名  :" style="width: 500px">
            <el-input
                v-model="user.userName"
                placeholder="请输入姓名"
                style="margin-bottom: 20px">
            </el-input>
          </el-form-item>

          <el-form-item
              label="修改密码  :"
              style="width: 500px; margin-bottom: 0px">
            <el-input
                v-model="user.password"
                placeholder="请输入密码"
                style="margin-bottom: 30px">
            </el-input>
          </el-form-item>
          <span style="margin-left: 200px">
            <el-button class="btn_sub" type="success" @click="onSubmit">确认提交</el-button>
            <el-button type="info" @click="onCancel">取消修改</el-button>
          </span>
        </el-form>
      </div>
    </div>
  </el-container>

</template>

<script>
import requests from "@/api/request";
export default {
  name: "",
  data() {
    return {
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
        headPhoto: "",
      },
    };
  },
  //挂载完毕
  mounted() {
    this.user = this.$route.query.user;
  },
  methods: {
    onSubmit() {
      this.user.id = window.localStorage.getItem("id");
      // 发送请求
      requests.post("/user/updateOneByID", this.user).then((res) => {
        if (res.code === "200") {
          this.$router.push("/mycenter");
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    //取消修改
    onCancel() {
      this.$router.push("/mycenter");
      this.$message.success("取消修改");
    },
    // 头像上传成功,res为文件地址
    load_success(res) {
      this.user.headPhoto = res;
    },
    //回到主页
    goHome(){
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: auto;
  background-color: #d3dce6;
}
.btn_sub {
  margin-bottom: 30px;
}

</style>