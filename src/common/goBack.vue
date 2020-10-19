<template>
    <span @click="$router.go(-1)">
        返回
    </span>
</template>
<script>
export default {
components:{
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
 span{
     color: white;
     font-size: 0.38rem;
     position: absolute;
     top: 0;
     left: 0.3rem;
     line-height: 0.8rem;
     z-index: 1;
 }
</style>