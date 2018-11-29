<template>
  <div ref="suggest" class='suggest'>
    <ul class="suggest-list">
      <li class="suggest-item" v-for='item in result'>
        <div class="icon">
          <i :class='getIconClass(item)'></i>
        </div>
        <div class="name">
          <p class="text" v-html='getDisplay(item)'></p>
        </div>
      </li>
    </ul>
    <div class="no-result-wrapper" display='none'>
      <!-- <no-result title="抱歉，暂无搜索结果"></no-result> -->
    </div>
  </div>
</template>
<script>
import { getSuggestList } from '../api/search';
import { ERR_OK } from '../config/conf';
export default{
  data(){
    return{
      page: 1,
      result: [] // 请求结果
    }
  },
  props: {
   query:{
     default: '',
     type: String
   }
  },
  computed:{ 
  },
  watch:{
    query(){
      this._getslist()
    }
  },
  methods:{
    _getslist(){
      getSuggestList(this.query,this.page).then(res=>{
        if(res.code === ERR_OK){
          this.result = this.getResult(res.data);
          console.log(this.result);
        }
      })
    },
    getResult(list){
      let ret  = [];
      if(list.zhida && list.zhida.singerid){
        ret.push({...list.zhida,...{type:'singer'}});
      }
      if(list.song){
        ret = ret.concat(list.song.list);
      }
      return ret;
    },
    getIconClass(item){
      if(item.type === 'singer'){
        return 'icon-mine'
      }else{
        return 'icon-music'
      }
    },
    getDisplay(item){
      if(item.type === 'singer'){
        return item.singername;
      }else{
        return `${item.songname} ~ ${this.filterSiner(item.singer)}`;
      }
    },
    filterSiner(singer){
      let ret = [];
      if(!singer){ // 不存在，就返回空字符串
        return '';
      }
      singer.forEach(s => {
        ret.push(s.name)
      })
      return ret.join(' / ');
      }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable"
  @import "../common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>