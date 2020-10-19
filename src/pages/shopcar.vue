<template>
  <div>
    <header>购物车</header>
    <div class="cen">
      <ul v-if="textshow == true">
        <li v-for="(item, index) in info" :key="item.id">
          <p class="store"><img :src="store" alt="" /> 杭州保税区仓</p>
          <div class="box">
            <div class="left" v-if="ishow">
              <img
                :src="item.select ? selectd : no_select"
                alt=""
                @click="numImg(index)"
              />
            </div>
            <div class="box_left">
              <img :src="'http://localhost:3000' + item.img" alt="" />
            </div>
            <div class="box_right">
              <p class="goodsname">{{ item.goodsname }}</p>
              <div class="span clearfix">
                <span @click="sub(item.goodsid, item.id)">-</span>
                <span>{{ item.num }}</span>
                <span @click="add(item.goodsid, item.id)">+</span>
              </div>

              <p class="price">
                总价:{{ (item.num * item.price) | filterPrice }}
              </p>
            </div>
            <div class="right">￥{{ item.price | filterPrice }}</div>
            <div class="btn" v-if="isshow" @click="del(index, item.id)">
              删除
            </div>
          </div>
        </li>
      </ul>
      <p class="text" v-else>暂无数据</p>
    </div>
    <div class="end">
      <div class="end_left">
        <img :src="quanxuan ? selectd : no_select" alt="" @click="quanx()" />
        <p>全选</p>
      </div>
      <div class="end_cen">
        <div class="editor">
          <img
            :src="editor_btn ? editor : no_editor"
            alt=""
            @click="editord()"
          />
          <p>编辑</p>
        </div>
        <div class="txt">
          <p class="he">合计：{{ allprice | filterPrice }}</p>
          <p class="yun">(不含运费)</p>
        </div>
      </div>
      <div class="end_right">去结算</div>
    </div>
  </div>
</template>
<script>
const baseUrl = "/api";
import {
  requestcartdelete,
  requestcartlist,
  requestcartedit,
} from "../util/request";
import store from "../assets/img/store.png";
import no_select from "../assets/img/radio_nor.png";
import selectd from "../assets/img/radio_hig.png";
import no_editor from "../assets/img/editor_nor.png";
import editor from "../assets/img/editor_hig.png";
import { successAlert, warningAlert } from "../util/alter";
export default {
  components: {},
  data() {
    return {
      uid: "",
      info: [],
      store,
      no_select,
      selectd,
      no_editor,
      editor,
      ishow: true,
      isshow: false,
      editor_btn: false,
      quanxuan: true,
      textshow: false,
    };
  },
  methods: {
    //全选
    quanx() {
      this.quanxuan = !this.quanxuan;
      if (this.quanxuan == true) {
        return this.info.every((item) => {
          return (item.select = true);
        });
      }
      if (this.quanxuan == false) {
        return this.info.forEach((item) => {
          return (item.select = false);
        });
      }
      // this.info[index].select=!this.info[index].select;
    },
    numImg(index) {
      this.info[index].select = !this.info[index].select;
      this.quanxuan = this.info.every((item) => item.select);
      // if (this.info[index].select == false) {
      //   this.quanxuan = false;
      // }
      // if (this.info[index].select == true) {
      //   this.quanxuan = true;
      // }
    },
    //自减
    sub(goodsid, id) {
      console.log(id);
      var index = this.info.findIndex((item) => item.id == id);
      this.info[index].num--;
      this.info[index].num = Math.max(this.info[index].num, 1);
      requestcartedit({
        id: id,
        type: 1,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          console.log("服务请求失败！");
        });
      // var json = this.info[index];
      // json.num--;
      // json.num = Math.max(json.num, 1);
      // this.$set(this.info, index, json);
    },
    //自加
    add(goodsid, id) {
      var index = this.info.findIndex((item) => item.id == id);
      this.info[index].num++;
      this.info[index].num = Math.min(this.info[index].num, 5);
      requestcartedit({
        id: id,
        type: 2,
      })
        .then((res) => {
          console.log(res);
          //   this.$set(this.info, index, this.info[index]);
        })
        .catch((err) => {
          console.log(err);
          console.log("服务请求失败！");
        });
      // var json = this.info[index];
      // json.num++;
      // json.num = Math.min(json.num, 5);
      // this.$set(this.info, index, json);
    },
    //显示删除键
    editord() {
      this.editor_btn = !this.editor_btn;
      if (this.editor_btn == true) {
        this.ishow = false;
        this.isshow = true;
      } else {
        this.isshow = false;
        this.ishow = true;
      }
    },
    //删除商品
    del(index, id) {
      this.info.splice(index, 1);
      console.log(id);
      // this.axios({
      //   url:baseUrl +"/api/cartdelete",
      //   method:"post",
      //   data:{id}
      // }).then(res=>{
      //   console.log(res);

      // })

      requestcartdelete(id).then((res) => {
        successAlert("删除成功");
      });
    },
  },
  mounted() {
    this.uid = localStorage.getItem("uid");
    requestcartlist(this.uid).then((res) => {
      //   console.log(res.data.list);
      this.info = res.data.list;
      if (this.info != null) {
        this.textshow = true;
        this.info.map((item) => {
          this.$set(item, "select", true);
        });
      } else {
        this.textshow = false;
      }
    });
  },
  computed: {
    //filter报错
    //总价
    allprice() {
      if (this.info != null) {
        var sum = 0;
        var arr = this.info.filter((item) => item.select);
        arr.forEach((item) => {
          sum += item.price * item.num;
        });
        return sum;
      }
    },
  },
};
</script>
<style scoped>
header {
  width: 100vw;
  height: 1rem;
  background: orange;
  color: white;
  line-height: 1rem;
  text-align: center;
  font-size: 0.4rem;
}
.cen {
  padding-bottom: 1.04rem;
}
.cen .store {
  line-height: 1rem;
  font-size: 0.3rem;
  color: #666;
}
.cen .store img {
  margin: 0 0.2rem 0 0.3rem;
  width: 0.4rem;
  height: 0.4rem;
}
.cen .box {
  display: flex;
  margin: 0.3rem 0;
}
.cen .box .box_left img {
  width: 1.6rem;
  height: 1.6rem;
}
.cen .box .left {
  width: 1rem;
}
.cen .box .left img {
  width: 0.45rem;
  height: 0.45rem;
  margin: 0.5rem 0 0 0.3rem;
}
.cen .box .box_right {
  width: 3rem;
  margin-left: 0.14rem;
}
.cen .box .box_right .goodsname {
  font-size: 0.34rem;
  color: #333;
  margin-top: -0.2rem;
}
.cen .box .box_right .span {
  margin-top: 0.4rem;
  margin-bottom: 0.24rem;
}
.cen .box .box_right .span span {
  padding: 0.06rem 0.26rem;
  border: 0.01rem solid #666;
  float: left;
}
.cen .btn {
  height: 1.6rem;
  width: 1rem;
  margin-left: 0.4rem;
  background: orange;
  color: white;
  line-height: 1.6rem;
  text-align: center;
}
.end {
  height: 1.04rem;
  position: fixed;
  bottom: 1.04rem;
  left: 0;
  display: flex;
  border-top: 0.01rem solid #333;
  background: white;
}
.end .end_right {
  width: 2rem;
  height: 1.04rem;
  background: orange;
  font-size: 0.4rem;
  line-height: 1.04rem;
  text-align: center;
  color: white;
}
.end .end_left {
  margin: 0 0.6rem 0 0.4rem;
}
.end .end_left img {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.1rem;
}
.end .end_left p {
  line-height: 0.5rem;
}
.end .end_cen {
  width: 3.6rem;
  display: flex;
}
.end .end_cen .txt {
  margin: 0 0.5rem 0 0.3rem;
}
.end .end_cen .he {
  width: 2rem;
  line-height: 0.5rem;
  margin-top: 0.2rem;
}
.end .end_cen .editor {
  width: 1rem;
}
.end .end_cen .editor img {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.1rem;
}
.end .end_cen .editor p {
  line-height: 0.5rem;
}
.cen .text {
  text-align: center;
  line-height: 1rem;
  font-size: 0.3rem;
}
</style>