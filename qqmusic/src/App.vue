<template>
  <div id="app">
   <m-header></m-header>
   <Tab></Tab>
   <!-- 渲染出口 -->
   <keep-alive>
     <router-view></router-view>
   </keep-alive>
   <!-- 写入 player 组件 -->
   <Player></Player> 
  </div>
</template>
<script>
  import MHeader from './components/m-header';
  import Tab from './components/tab/tab';
  import Player from './components/player';
  export default {
    components:{
      MHeader,
      Tab,
      Player
    }
  }
</script>
<style lang="stylus">
</style>
