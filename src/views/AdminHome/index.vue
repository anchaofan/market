<template>
  <div>
    <div class="title">欢迎来到后台管理员界面</div>
    <div>
      <el-container style="height: 100vh; border: 1px solid #87CEFA">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

          <el-menu :default-openeds="['1', '2']" :router= true active-text-color="#66ccff"
          style="height:100%;">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
              <el-menu-item-group>
                <el-menu-item index="userRegister">用户注册管理</el-menu-item>
                <el-menu-item index="userList">用户列表管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title"><i class="el-icon-office-building"></i>商家管理</template>
              <el-menu-item-group>
                <el-menu-item index="storeRegister">商家注册管理</el-menu-item>
                <el-menu-item index="storeList">商家列表管理</el-menu-item>
                <el-menu-item index="storeGoods">商品发布管理</el-menu-item>
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
export default {
  name: "",
  data() {
    return {
      username:"",
    };
  },
  mounted(){
    this.username = window.localStorage.getItem("username");
  },
  methods:{
    // 退出登录
    out(){
      this.$router.push("/adminlogin");
    },
    home(){
      this.$router.push("/adminhome")
    }
  }
};
</script>

<style>
.title{
  width: 100%;
  height: 60px;
  /* #778899 */
  background-color: #8c939d;
  font-size: 30px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 6px;
  color: white;
  
}
</style>
