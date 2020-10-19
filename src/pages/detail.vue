<template>
  <div>
    <div class="wrap">
      <header>
        <go-back class="goback"></go-back>
        <p>商品详情</p>
      </header>
      <div class="cen">
        <img :src="'http://localhost:3000' + info.img" alt="" class="cen_img" />
        <div class="info">
          <p class="goodsname">{{ info.goodsname }}</p>
          <!-- 迷惑行为，去掉v-if报错 -->
          <p class="price" v-if="info.price">
            ￥{{ info.price | filterPrice }}
          </p>
          <p class="market_price" v-if="info.market_price">
            ￥{{ info.market_price | filterPrice }}
          </p>
          <div class="cen_hot">
            <span v-if="info.ishot == 1">{{
              info.ishot == 1 ? "热卖" : ""
            }}</span>
            <span v-if="info.isnew == 1">{{
              info.isnew == 1 ? "新品" : ""
            }}</span>
          </div>
          <div class="cen_box">
            <img :src="sc" alt="" />
            <p>收藏</p>
          </div>
        </div>
      </div>
      <div v-html="info.description"></div>
    </div>
    <footer @click="ishow = !ishow">
      <div>加入购物车</div>
    </footer>
    <div class="toast" v-show="ishow" @click.self="(toast) => (ishow = false)">
      <div class="toast_box">
        <div class="toast_top">
          <img :src="'http://localhost:3000' + info.img" alt="" />
          <p>{{ info.goodsname }}</p>
        </div>
        <div class="toast_cen">
          <p>{{ info.specsname }}</p>
          <ul class="clearfix">
            <li
              :class="{ select: index == activeName }"
              v-for="(item, index) in arr"
              :key="index"
              @click="selected(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="toast_btn" @click="submit">加入购物车</div>
      </div>
    </div>
  </div>
</template>
<script>
import sc from "../assets/img/img/cart_on.png";
import { requestgoodInfo, requestcartadd } from "../util/request";
export default {
  components: {},
  data() {
    return {
      id: "",
      info: "",
      sc,
      arr: "",
      activeName: "",
      ishow: false,
      uid: "",
      goodsid: "",
      num: 1,
    };
  },
  mounted() {
    // console.log(localStorage.getItem("uid"));
    this.id = this.$route.query.id;
    requestgoodInfo(this.id)
      .then((res) => {
        this.info = res.data.list[0];
        this.arr = JSON.parse(res.data.list[0].specsattr);
        this.goodsid = this.info.id;
      })
      .catch((err) => {
        console.log(err);
        // alert("服务请求失败！");
      });
  },

  methods: {
    selected(index) {
      this.activeName = index;
    },
    submit() {
      this.uid = localStorage.getItem("uid");
      //  console.log(this.goodsid,this.num);
      requestcartadd({
        uid: this.uid,
        goodsid: this.goodsid,
        num: this.num,
      })
        .then((res) => {
          console.log(res);
          this.ishow = !this.ishow;
          console.log("加入购物车成功");
        })
        .catch((err) => {
          console.log(err);
          // alert("服务请求失败！");
        });
    },
  },
};
</script>
<style scoped>
.toast .toast_box .toast_cen ul .select {
  border: 0.01rem solid orange;
  color: orange;
}
.toast .toast_box .toast_cen ul li {
  float: left;
  padding: 0.2rem 0.3rem;
  border: 0.01rem solid black;
  margin-left: 0.3rem;
}
.toast .toast_box .toast_cen p {
  font-size: 0.4rem;
  font-weight: bold;
  line-height: 1rem;
  margin-left: 0.3rem;
}
.toast .toast_box .toast_top p {
  font-size: 0.4rem;
  margin: 0.4rem 0 0 0.2rem;
}
.toast .toast_box .toast_top img {
  width: 2.2rem;
  height: 2.2rem;
  margin: 0.3rem 0 0 0.3rem;
  vertical-align: middle;
}
.toast .toast_box .toast_top {
  display: flex;
}
.toast .toast_box {
  width: 100vw;
  height: 6rem;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
}
.toast {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 999;
}
footer {
  width: 100vw;
  height: 1rem;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
}
footer div {
  height: 1rem;
  width: 2rem;
  background: orange;
  color: white;
  text-align: center;
  line-height: 1rem;
  position: absolute;
  bottom: 0;
  right: 0;
}
.wrap {
  padding-bottom: 1rem;
}
.cen .info .cen_hot {
  position: absolute;
  top: 1rem;
  left: 2rem;
}
.cen .info .cen_hot span {
  border: 1px solid orange;
  padding: 0.1rem;
  color: orange;
  font-size: 0.24rem;
}
.cen .info .cen_box {
  width: 0.5rem;
  height: 0.6rem;
  border-left: 0.01rem solid #ccc;
  padding-left: 0.1rem;
  position: absolute;
  right: 0.4rem;
  top: 0.16rem;
}
.cen .info .cen_box img {
  width: 0.3rem;
  height: 0.3rem;
  margin-left: 0.1rem;
}
.cen .info .cen_box p {
  font-size: 0.2rem;
  line-height: 0.36rem;
  color: red;
}
.cen .info .market_price {
  font-size: 0.26rem;
  color: #666;
  margin-left: 0.3rem;
  text-decoration: line-through;
  margin-bottom: 0.2rem;
  line-height: 0.4rem;
}
.cen .info .goodsname {
  line-height: 1rem;
  font-size: 0.4rem;
  margin-left: 0.4rem;
}
.cen .info .price {
  line-height: 0.5rem;
  font-size: 0.3rem;
  color: red;
  margin-left: 0.4rem;
}
.cen .info {
  width: 100vw;
  border-bottom: 0.3rem solid #ccc;
  position: relative;
}
.cen .cen_img {
  width: 100vw;
  height: 4rem;
  vertical-align: middle;
}
header {
  height: 1rem;
  background: orange;
}
header .goback {
  margin-top: 0.1rem;
}
header p {
  color: white;
  line-height: 1rem;
  font-size: 0.4rem;
  text-align: center;
}
.toast_btn {
  width: 2.6rem;
  height: 1.2rem;
  background: orange;
  margin: 0.3rem auto 0;
  color: white;
  line-height: 1.2rem;
  text-align: center;
  font-size: 0.3rem;
}
</style>