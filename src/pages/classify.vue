<template>
  <div class="wrap">
    <header>分类</header>
    <div class="box">
      <div class="left">
        <ul>
          <li
            @click="selected(index, item)"
            :class="{ select: index == activeName }"
            v-for="(item, index) in infos"
            :key="item.id"
          >
            {{ item.catename }}
          </li>
        </ul>
      </div>
      <div class="right">
        <v-card :info="arr"></v-card>
      </div>
    </div>
  </div>
</template>
<script>
import vCard from "../components/card";
import { requestgetcate } from "../util/request";
export default {
  mounted() {
    requestgetcate()
      .then((res) => {
        //   console.log(res.data.list);
        this.infos = res.data.list;
      })
      .catch((err) => {
        console.log(err);
        // alert("服务请求失败！");
      });
  },
  components: { vCard },
  data() {
    return {
      infos: "",
      activeName: "",
      arr: "",
    };
  },
  methods: {
    selected(index, item) {
      this.activeName = index;
      this.arr = item;
      // console.log(this.arr);
    },
  },
};
</script>
<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  background: #fafafa;
  padding-bottom: 0px;
}
header {
  width: 100vw;
  height: 1rem;
  background: orange;
  color: white;
  line-height: 1rem;
  text-align: center;
  font-size: 0.4rem;
}
.left {
  width: 2.6rem;
  box-sizing: border-box;
}
.left ul li {
  line-height: 1rem;
  font-size: 0.3rem;
  text-align: center;
}
.select {
  background: white;
  color: orange;
  border-left: 0.1rem solid blue;
}
.box {
  display: flex;
}
.right {
  flex: 1;
}
</style>