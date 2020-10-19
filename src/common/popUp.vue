<template>
  <div class="toast">{{ msg }}</div>
</template>
<script>
export default {
  // props: ["msg"],
  components: {},
  data() {
    return {
        timer:null
    };
  },
  methods: {},
  mounted(){  
     
      //toast 挂载完成 2秒钟之后，通知父组件 将控制的那个变量变成false
     
      this.Event.$on("hide",(e)=>{
          this.timer=setTimeout(()=>{
          this.msg=e
      },2000)
      })
  },
  beforeDestroy() {
      clearTimeout(this.timer)
      console.log("toast beforeDestroy")
  },
};
</script>
<style scoped>
.toast{
    padding: .26rem 0.6rem;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    border-radius: 0.15rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
</style>