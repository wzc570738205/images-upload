<template>
  <div id="app">
    <div>123</div>
 <imgUpload/> 
    <div>123</div>

   </div>
</template>

<script>
import imgUpload from './lib/imgUpload.vue'
export default {
  name: "app",
  components:{
    imgUpload
  },
  mounted() {
   
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
