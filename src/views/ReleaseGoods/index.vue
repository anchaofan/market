<template>
    <div class="page">
      <el-card class="box-card">
        <div class="name">
          <span>商品名称： </span>
          <el-input v-model="goods.goodsName" style="width: 350px"></el-input>
        </div>
        <div class="name">
          <span>商品原价： </span>
          <el-input v-model="goods.oprice" style="width: 350px"></el-input>
        </div>
        <div class="name">
          <span>商品现价： </span>
          <el-input v-model="goods.cprice" style="width: 350px"></el-input>
        </div>
        <div class="name">
          <span>商品数量： </span>
          <el-input v-model="goods.goodsNum" style="width: 350px"></el-input>
        </div>

        <div style="margin-top: 50px; margin-left: 50px">
        <span style="color: black; font-size: 20px">商品图片：
        </span>
          <el-upload
              style="margin-top: 20px; margin-left: 100px"
              class="upload-demo"
              drag
              action="http://localhost:9090/file/upload"
              multiple
              :on-success="load_p">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>

        <div style="margin-left: 130px">
          <el-button class="btn_fabu" type="danger" @click="btn_goods" round>确认发布</el-button>
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
      goods: {
        goodsName: "",
        oprice: "",
        cprice: "",
        goodsNum: 0,
        picture: "",
        goodsTypeId: 1,
      },
      userID: 999,
    };
  },
  methods: {
    load_p(res) {
      this.goods.picture = res;
    },
    // 发布按钮
    btn_goods() {
      this.userID = window.localStorage.getItem("id");
    
      if (this.goods.goodsName === "") {
        this.$message.error("商品名不能为空");
      } else if (this.goods.oprice === "") {
        this.$message.error("原价不能为空");
      } else if (this.goods.cprice === "") {
        this.$message.error("现价不能为空");
      } else {
        requests
          .post("/goods/addOne", this.goods,
          {
            params:{
               userID: this.userID,
            }
          })
          .then((res) => {
            console.log(res);
            if (res.code === "200") {
              this.$router.push("/GoodsManagement");
              this.$message.success("商品发布成功");
            } else {
              this.$message.error("商品发布失败");
            }
          });
      }
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
/* 商品名称 */
.name {
  margin-left: 50px;
  margin-top: 50px;
  font-size: 20px;
  color: black;
}
.btn_fabu {
  margin-top: 30px;
  width: 400px;
  margin-left: -40px;
}
</style>