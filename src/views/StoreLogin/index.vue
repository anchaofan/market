<template>
  <div id="app">
    <div id="admin">
      <div class="pos" v-loading="loading">
        <h1 class="adminh1">商家登录</h1>
        <el-form
            :model="user"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm">
          <el-form-item label="用户名：" prop="loginName">
            <el-input
                prefix-icon="el-icon-user"
                style="width: 250px"
                type="text"
                v-model="user.loginName"
                autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="密 码：" prop="password">
            <el-input
                prefix-icon="el-icon-menu"
                style="width: 250px"
                show-password
                type="password"
                v-model="user.password"
                autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item>
            <Vcode :show="isShow" @success="success" @close="close" />
            <el-button type="primary" style="width: 250px; background: rgb(225, 243, 216); color: black;" @click="submit">登陆</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 120px; background: rgb(253, 226, 226);" class="el-icon-user">
              <router-link to="/login" style="color: black;">用户登录</router-link>
            </el-button>
            <el-button type="primary" style="width: 120px; background: rgb(253, 226, 226);" class="el-icon-user-solid">
              <router-link to="/adminlogin" style="color: black;">管理员登陆</router-link>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Vcode from "vue-puzzle-vcode";
import requests from "@/api/request";
export default {
  name: "app",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户信息"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8 || value.length > 13) {
        callback(new Error("长度必须在8-12之内!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      user: {
        loginName: "",
        password: "",
        role: 0,
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      isShow: false,
    };
  },
  components: {
    Vcode,
  },
  methods: {
    //登陆+验证
    submit() {
      this.isShow = true;
    },
    // 用户通过了验证
    success() {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.user.role = 1;
      console.log(this.user);
      requests.post("http://localhost:9090/user/login", this.user).then((res) => {
        // 请求成功
        if (res.code === "200") {
          // 保存个人信息 token
          window.localStorage.setItem("user", JSON.stringify(res.data));
          this.$message.success("登录成功");
          this.$router.push("/storeManagement");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
body {
  background: rgb(135, 206, 235);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#admin {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -250px;
  width: 500px;
  height: 400px;
  background: #fff;
  border-radius: 10%;
  box-shadow: 8px 10px 10px rgb(177, 223, 242);
}
.adminh1 {
  margin: 20px 0;
  text-shadow: 10px 13px 3px rgb(207, 207, 207);
  text-align: center;
}
.pos {
  width: 450px;
  height: 350px;
  position: absolute;
  top: 25px;
  left: 25px;
}
</style>

