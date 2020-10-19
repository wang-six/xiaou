<template>
  <div>
    <footer>
      <router-link
        :to="item.path"
        v-for="item in navs"
        :key="item.name"
        activeClass="select"
      >
        <img :src="item.select" v-if="$route.path == item.path" alt="" />
        <img :src="item.no_select" v-else alt="" />
        <p>{{ item.name }}</p>
      </router-link>
    </footer>
  </div>
</template>
<script>
import home_no from "../assets/img/tab_home_nor.png";
import home_yes from "../assets/img/tab_home_hig.png";
import classify_no from "../assets/img/tab_menu_nor.png";
import classify_yes from "../assets/img/tab_menu_hig.png";
import shopcar_no from "../assets/img/tab_shopping_nor.png";
import shopcar_yes from "../assets/img/tab_shopping_hig.png";
import mine_no from "../assets/img/tab_me_nor.png";
import mine_yes from "../assets/img/tab_me_hig.png";
export default {
  components: {},
  data() {
    return {
      navs: [
        {
          name: "首页",
          select: home_yes,
          no_select: home_no,
          path: "/index/home",
        },
        {
          name: "分类",
          select: classify_yes,
          no_select: classify_no,
          path: "/index/classify",
        },
        {
          name: "购物车",
          select: shopcar_yes,
          no_select: shopcar_no,
          path: "/index/shopcar",
        },
        {
          name: "我的",
          select: mine_yes,
          no_select: mine_no,
          path: "/index/mine",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style scoped>

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 1.04rem;
  display: flex;
  background: white;
}

footer a {
  flex: 1;
  padding: .2rem 0;
}

footer a img {
  width:.36rem;
  height: .36rem;
  display: block;
  margin: 0px auto;
}

footer a p {
  text-align: center;
  line-height: .48rem;
}

.select {
  color:orange ;
}
</style>