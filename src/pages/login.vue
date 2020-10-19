<template>
  <div class="box">
    <h2>登录<span @click="register">注册</span></h2>
    <div class="txt">
      <div class="txtname">账 号：</div>
      <input type="text" v-model="user.name" />
    </div>
    <div class="txt">
      <div class="txtpass">密 码：</div>
      <input type="text" v-model="user.pass" />
    </div>
    <p>忘记密码</p>
    <div @click="login" class="btn">登录</div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { successAlert, warningAlert } from "../util/alter";
import { requestLogin } from "../util/request";
export default {
  components: {},
  data() {
    return {
      user: {
        name: "",
        pass: "",
      },
    };
  },
  methods: {
    ...mapActions({
      changeUserInfoAction: "changeUserInfoAction",
    }),
    login() {
      if (this.user.name === "" || this.user.pass === "") {
        warningAlert("账号或密码不能为空");
      } else {
        requestLogin({
          phone: this.user.name,
          password: this.user.pass,
        })
          .then((res) => {
            //  console.log(res.data.list.uid);
            if (res.data.code === 200) {
              localStorage.setItem("uid", res.data.list.uid);
              this.changeUserInfoAction(res.data.list);
              //   console.log($store);
              this.$router.push({
                path: "/index",
              });
            } else {
              successAlert("账号或密码错误！");
            }
          })
          .catch((err) => {
            // alert("服务请求失败！");
          });
      }
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>
<style scoped>
.box {
  background: #fafafa;
  width: 100vw;
  height: 100vh;
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
p {
  width: 80%;
  text-align: right;
  margin: 0.6rem auto 0.4rem;
  color: #666666;
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
  margin: 0 auto;
}
</style>