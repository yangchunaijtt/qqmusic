<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" class="box" v-model="query" placeholder="请求输入歌手/歌曲"/>
    <i class="icon-dismiss" @click='clearQuery' v-show='query'></i>
  </div>
</template>

<script >
export default {
  data(){
    return {
      query: ''
    }
  },
  methods:{
    clearQuery(){
      this.query = '';
    },
    setQuery(query){
      this.query = query;
    }
  },
  watch:{
    query(newQuery){
      this.$emit('queryChange',newQuery);
    }
  }
};
</script>

<style scoped lang="stylus" >
@import '../common/stylus/variable';

.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: #ddd;
  border-radius: 6px;

  .icon-search {
    font-size: 24px;
    color: $color-background;
  }

  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: #ddd;
    color: #333;
    font-size: 18px;
    outline: none;

    &::placeholder {
      color: #666;
    }
  }

  .icon-dismiss {
    font-size: 16px;
    color: $color-background;
  }
}
</style>