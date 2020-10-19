<template>
  <div class="wrap">
    <header>
      <go-back class="goback"></go-back>
      <p>{{ txt }}</p>
    </header>
    <ul class="wrap_ul">
      <li v-for="item in info" :key="item.id"   @click="getdetail(item.id)">
        <img :src="'http://localhost:3000' + item.img" alt="" />
        <div class="box">
            <p class="goodsname">{{item.goodsname}}</p>
            <p class="price">￥{{item.price| filterPrice}}</p>
            <div>立即抢购</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { requestgetgoods } from "../util/request";
export default {
  mounted() {
    this.fid = this.$route.query.fid;
    this.txt = this.$route.query.txt;
    // console.log(this.fid);
    // console.log(this.txt);
    requestgetgoods(this.fid)
      .then((res) => {
        // console.log(res.data.list);
        this.info = res.data.list;
      })
      .catch((err) => {
        console.log(err);
        // alert("服务请求失败！");
      });
  },
  components: {},
  data() {
    return {
      fid: "",
      txt: "",
      info: "",
    };
  },
  methods: {
      getdetail(id){
      this.$router.push("/detail?id="+id)
   }
  },
};
</script>
<style scoped>
.wrap{
    width:100vw;
    overflow: hidden;
}
header {
  width: 100%;
  height: 1rem;
  background: orange;
}
header p {
  font-size: 0.4rem;
  color: white;
  line-height: 1rem;
  text-align: center;
}
.goback {
  margin-top: 0.1rem;
}
.wrap_ul li{
    box-sizing: border-box;
    padding: .2rem;
display: flex;
}
.wrap_ul li img{
    width: 2rem;
    height: 2rem;
    margin-right: .2rem;
}
.wrap_ul li .goodsname{
    font-size: .4rem;
    line-height: .55rem;
    margin-bottom: .2rem;
}
.wrap_ul li .price{
    font-size: .4rem;
    line-height: .55rem;
    color: red;
}
.wrap_ul li .box  div{
    width: 1.6rem;
    height: .7rem;
    background: orange;
    line-height: .7rem;
    color: white;
    text-align: center;
    border-radius: .2rem;
}
</style>