<template>
  <div class="card">
      <ul v-if="info.length==0">
        <li v-for="item in infos" :key="item.id" @click="getdetail(item.pid,item.catename)">
          <img :src="'http://localhost:3000'+item.img" alt="">
          <p>{{item.catename}}</p>
        </li>
      </ul>
      <ul v-else>
        <li v-for="item in info.children" :key="item.id"  @click="getdetail(item.pid,item.catename)">
          <img :src="'http://localhost:3000'+item.img" alt="">
          <p>{{item.catename}}</p>
        </li>
      </ul>
  </div>
</template>
<script>
import { requestgetcate } from "../util/request";
export default {
  props: ["info"],
  mounted(){
    // console.log(this.infos);
    requestgetcate()
      .then((res) => {
        // console.log(res.data.list[0].children);
        this.infos = res.data.list[0].children;
      })
      .catch((err) => {
        console.log(err);
        alert("服务请求失败！");
      });
      
  },
  components: {},
  data() {
    return {
      infos:""
    };
  },
  methods: {
      getdetail(fid,txt){
      this.$router.push("/index/classcard?fid="+fid+'&txt='+txt)
      // this.$router.push({
      //   path: "/index/classcard",
      //   name: "classcard",
      //   params: {
      //     fid: fid,
      //     txt:txt
      //   }})
   }
  }
};
</script>
<style scoped>
.card ul {
  display: flex;
  flex-wrap: wrap;
}
.card ul li{
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  position: relative;
  border-radius: 0.2rem;
  margin-top: .3rem;
  margin-right: .2rem;
}
.card ul li img{
  width: 2rem;
  height: 2rem;
}
.card ul li p{
  position: absolute;
  bottom: 0;
  left: 0;
  background: #1d84a7;
  color: white;
  line-height: 0.5rem;
  text-align: center;
  width: 100%;
}
</style>