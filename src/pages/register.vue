<template>
  <div class="box">
    <go-back></go-back>
    <h2>注册</h2>
    <div class="txt">
      <div class="txtphone">手机号：</div>
      <input type="text" v-model="user.phone" />
    </div>
    <div class="txt">
      <div class="txtname">昵 称：</div>
      <input type="text" v-model="user.name" />
    </div>
    <div class="txt">
      <div class="txtpass">密 码：</div>
      <input type="text" v-model="user.pass" />
    </div>
    <div @click="register" class="btn">注册</div>
    <pop-up v-if="isShow" @hide="isShow = false" msg="注册成功"></pop-up>
  </div>
</template>
<script>
import { requestRegister } from "../util/request";
import { warningAlert } from "../util/alter";
export default {
  components: {},
  data() {
    return {
      isShow: false,
      user: {
        name: "",
        pass: "",
        phone: "",
      },
    };
  },
  methods: {
    register() {
      console.log(1);
      // this.isShow=true;
      requestRegister({
        phone: this.user.phone,
        nickname: this.user.name,
        password: this.user.pass,
      }).then((res) => {
        // console.log(res);
        // console.log(res.data.code);
        if (res.data.code === 200) {
          warningAlert("注册成功");
          this.$router.push({
            path: "/login",
          });
        } else {
          warningAlert("注册失败");
        }
      });
    },
  },
};
</script>
<style scoped>
.box {
  background: #fafafa;
  width: 100vw;
  height: 100vh;
  position: relative;
}
h2 {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: #ff9900;
  color: white;
  font-size: 0.38rem;
  text-align: center;
  position: relative;
  margin-bottom: 2rem;
}
h2 span {
  position: absolute;
  right: 0.34rem;
}
.txt {
  width: 80%;
  margin: 0 auto 0.1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  border-bottom: 1px solid #a3a3a3;
  display: flex;
}
.txt input {
  flex: 1;
  font-size: 0.3rem;
  background: #fafafa;
  border: none;
}
.btn {
  width: 5.98rem;
  height: 1rem;
  background: #f90;
  color: #fff;
  font-size: 0.34rem;
  text-align: center;
  line-height: 1rem;
  border-radius: 0.2rem;
  margin: 0.5rem auto 0;
}
</style>