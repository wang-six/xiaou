<template>
<div class="box">
   <router-view class="wrap"></router-view>
   
   <v-nav></v-nav>
</div>
</template>
<script>
import vNav from "../components/nav"
export default {
components:{
   vNav
},
data(){
   return {
   }
},
methods: {
},
}
</script>
<style scoped>
.wrap{
   width: 100vw;
   padding-bottom: 1.04rem;
   background: #fafafa;
}
</style>