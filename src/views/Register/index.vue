<template>
  <div id="app">
    <div id="admin">
      <div class="user_register_pos">
        <h1 class="adminh1">用户注册</h1>
        <el-form
            :model="user"
            status-icon
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm">
          <el-form-item label="用户id：" prop="loginName">
            <el-input
                prefix-icon="el-icon-user"
                style="width: 250px"
                type="text"
                v-model="user.loginName"
                autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="用户密码：" prop="password">
            <el-input
                prefix-icon="el-icon-menu"
                style="width: 250px"
                show-password
                type="password"
                v-model="user.password"
                autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input
                prefix-icon="el-icon-menu"
                style="width: 250px"
                show-password
                type="password"
                v-model="password2"
                autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item>
            <Vcode :show="isShow" @success="success" @close="close" />
            <el-button type="primary" style="width: 120px; background: rgb(225, 243, 216);" @click="submit">注册</el-button>
            <el-button type="primary" style="width: 120px; background: rgb(225, 243, 216);" @click="goUser_index">返回</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import Vcode from "vue-puzzle-vcode";

export default {
  name: "register",
  data() {
    return {
      user: {
        loginName: "",
        password: "",
      },
      code: "",
      password2: "",
      isShow: false,
    };
  },
  components: {
    Vcode,
  },
  methods: {
    //注册+验证
    submit() {
      this.isShow = true;
    },
    // 用户通过了验证
    success() {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      if (this.user.loginName === '') {
        this.$message.error("用户名不能为空");
      } else if ( this.user.password === '') {
        this.$message.error("密码不能为空");
      } else if (this.user.password !== this.password2) {
        this.$message.error("两次密码输入不同");
      } else {
        this.$axios.post("http://localhost:9090/user/register", this.user).then((res) => {
          console.log(res);
          if (res.data.code === "200") {
            this.$router.push("/login");
            this.$message.success("注册成功");
          } else {
            this.$message.error("注册失败");
          }
        });
      }
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
    //返回登录界面
    goUser_index() {
      this.$router.push({
        name: 'user_index',
      })
    }
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
  top: 40%;
  left: 50%;
  margin-top: -200px;
  margin-left: -250px;
  width: 500px;
  height: 700px;
  background: #fff;
  border-radius: 10%;
  box-shadow: 8px 10px 10px rgb(177, 223, 242);
}
.adminh1 {
  margin: 20px 0;
  text-shadow: 10px 13px 3px rgb(207, 207, 207);
  text-align: center;
}
.user_register_pos {
  width: 450px;
  height: 350px;
  position: absolute;
  top: 25px;
  left: 25px;
}
</style>

