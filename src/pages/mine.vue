<template>
<div>
<header>
<span class="chilun iconfont icon-chilun--"></span>
<span class="xiaoxi iconfont icon-xiaoxi"></span>
<div class="circle">9+</div>
<p class="header_cen">个人中心</p>
<div class="header_info">
<div class="header_img">
   <img :src="bg" alt=""> 
</div> 
<p>小不点儿</p>
</div>
</header>
<p class="collect"><img :src="keep" alt="" class="collect_img"> 我的收藏(5)</p>
<p class="order">我的订单<span>查看订单</span></p>
<div class="list_img">
   <ul class="clearfix">
      <li v-for="item in infos" :key="item.id">
         <img :src="item.img" alt="">
         <span v-if="item.num!==''">{{item.num}}</span>
         <p>{{item.txt}}</p>
      </li>
   </ul>
</div>
<p class="address">收货地址管理</p>
</div>
</template>
<script>
import bg from "../assets/img/1.jpg"
import keep from "../assets/img/keep.png"
import iconrefund from "../assets/img/icon_refund.png"
export default {
components:{
},
data(){
   return {
      bg,
      keep,
      infos:[
         {
            id:1,
            img:iconrefund,
            txt:"待发货",
            num:""
         },
         {
            id:2,
            img:iconrefund,
            txt:"待发货",
            num:"9+"
         },
         {
            id:3,
            img:iconrefund,
            txt:"待发货",
            num:"9+"
         },
         {
            id:4,
            img:iconrefund,
            txt:"待发货",
            num:"9+"
         },
         {
            id:5,
            img:iconrefund,
            txt:"待发货",
            num:"9+"
         },
      ]
   }
},
methods: {
   
},
}
</script>
<style scoped>
header{
   width: 100vw;
   height: 4rem;
   background: orange;
   position: relative;
}
header .header_cen{
   text-align: center;
   color: white;
   font-size: .46rem;
   line-height: 0.8rem;
}
header .header_img{
   border-radius: 50%;
   overflow: hidden;
   border: 0.14rem solid white;
   
}
header .header_img img{
   width:2rem;
   height: 2rem;
}
header .header_info{
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   bottom: -1.6rem;
}
header .header_info p{
   text-align: center;
   font-size: .3rem;
   line-height: .6rem;
}
.collect{
   padding-top: 1.3rem;
   background: white;
   font-size: .36rem;
   line-height: 1.4rem;
   padding-left: .4rem;
}
.address{
   margin-top: .1rem;
   background: white;
   font-size: .36rem;
   line-height: 1.4rem;
   padding-left: .4rem;
}
.order{
   margin-top: .1rem;
   background: white;
   font-size: .36rem;
   line-height: 1.4rem;
   padding-left: 1rem;
}
.order span{
   color:#ccc ;
   margin-left: 3.3rem;
}
.list_img{
   border-top: .02rem solid #333;
   background: white;
}
.list_img ul{
   width: 100%;
}
.list_img ul li{
   float: left;
   position: relative;
   margin: .4rem .3rem 0;
}
.list_img ul li img{
   width: .5rem;
   height: .5rem;
   vertical-align: middle;
   margin-left: .14rem;
}
.list_img ul li span{
   position: absolute;
   width: .32rem;
   height: .32rem;
   background: red;
   border-radius: 50%;
   color: white;
   text-align: center;
   line-height: .32rem;
   font-size: .1rem;
   right: .02rem;
   top:-.1rem;
}
.list_img ul li p{
   line-height: .7rem;
   padding-bottom: .2rem;
}
header span{
   font-size: .6rem;
   color: white;
   position: absolute;
   top: .1rem;
}
header .chilun{
   left: .2rem;
}
header .xiaoxi{
   right: .3rem;
}
header .circle{
   position: absolute;
   width: .32rem;
   height: .32rem;
   background: red;
   border-radius: 50%;
   color: white;
   text-align: center;
   line-height: .32rem;
   font-size: .1rem;
   right: .26rem;
}
.collect_img{
   width: .4rem;
   height: .4rem;
   vertical-align: middle;
   margin-right: .2rem;
}
</style>