<template>
  <div>
    <header>
      <img :src="logo" alt="" />
      <div class="search">寻找商品</div>
    </header>
    <div class="slideshow">
      <img :src="'http://localhost:3000' + slide" alt="" />
    </div>
    <div class="sale_img">
      <ul>
        <li v-for="item in sales" :key="item.id">
          <img :src="item.img" alt="" />
          <p>{{ item.txt }}</p>
        </li>
      </ul>
    </div>
    <ul class="info">
      <li v-for="item in info" :key="item.id" @click="getdetail(item.id)">
        <img :src="'http://localhost:3000' + item.img" alt="" />
        <div>
          <p class="goodsname">{{ item.goodsname }}</p>
          <p class="price">￥{{ item.price | filterPrice }}</p>
          <div class="btn">立即抢购</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import logo from "../assets/img/img/home/logo.jpg";
import sale from "../assets/img/img/home/1.jpg";
import { requestSlide, requestInfo } from "../util/request";
export default {
  components: {},
  data() {
    return {
      slide: "",
      logo,
      info: "",
      sales: [
        {
          id: 1,
          img: sale,
          txt: "限时抢购",
        },
        {
          id: 2,
          img: sale,
          txt: "积分商城",
        },
        {
          id: 3,
          img: sale,
          txt: "联系我们",
        },
        {
          id: 4,
          img: sale,
          txt: "商品分类",
        },
      ],
    };
  },
  mounted() {
    requestSlide()
      .then((res) => {
        this.slide = res.data.list[0].img;
      })
      .catch((err) => {
        console.log(err);
        // alert("服务请求失败！");
      });
    requestInfo()
      .then((res) => {
        // console.log(res.data.list[0].content);
        this.info = res.data.list[0].content;
      })
      .catch((err) => {
        console.log(err);
        // alert("服务请求失败！");
      });
  },
  methods: {
    getdetail(id) {
      this.$router.push("/detail?id=" + id);
    },
  },
};
</script>
<style scoped>
header {
  display: flex;
  height: 1.2rem;
}
header img {
  display: block;
  margin-left: 0.2rem;
  width: 2rem;
  height: 0.5rem;
  margin-top: 0.3rem;
}
.search {
  width: 1.8rem;
  height: 0.6rem;
  line-height: 0.6rem;
  background: #cccccc;
  text-align: center;
  border-radius: 0.22rem;
  margin: 0.3rem 0 0 1.6rem;
  color: #666;
}
.slideshow {
  width: 100vw;
  height: 4rem;
}
.slideshow img {
  width: 100vw;
  height: 4rem;
}
.sale_img ul {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.sale_img li p {
  text-align: center;
  line-height: 0.6rem;
}
.sale_img img {
  width: 1.6rem;
  height: 1.6rem;
  vertical-align: middle;
}
.info {
  width: 100%;
}
.info li {
  padding-left: 0.2rem;
  margin-bottom: 0.4rem;
  display: flex;
}
.info li img {
  width: 2rem;
  height: 2rem;
  border-radius: 0.2rem;
}
.info li div {
  margin-left: 0.3rem;
}
.info li div .goodsname {
  font-size: 0.4rem;
  line-height: 0.56rem;
}
.info li div .price {
  color: red;
  line-height: 0.56rem;
  font-size: 0.4rem;
  margin-top: 0.2rem;
}
.info li div .btn {
  padding: 0.2rem 0.4rem;
  background: #f90;
  color: #fff;
  display: inline-block;
  border-radius: 0.2rem;
  margin-left: 0rem;
}
</style>