<template>
   <Scroll class='listview' ref='listview'>
     <ul>
       <li v-for='group in data' class='list-group' ref='listgroup'>
         <h2 class='list-group-title'>{{ group.title }}</h2>
         <ul>
           <li class='list-group-item' v-for='i in group.items' @click='selectItem(i)'>
             <img v-lazy="i.headImg" class='avatar'>
             <span class='name'>{{ i.Fname }}</span>
           </li>
         </ul>
       </li>
     </ul>
     <!-- 检索入口列表 -->
     <div class='list-shortcut'>
       <ul>
         <li class='item' v-for='(item,index) in titleList' @touchstart='shortcut(index)'>
           {{ item }}
         </li>
       </ul>
     </div>
   </Scroll>
</template>
<script> 
import Scroll from './scroll';
export default {
  props:{
    data:{
      type: Array,
      default: null
    }
  },
  components:{
    Scroll
  },
  computed:{
    titleList(){
      return this.data.map((val)=>{
        return val.title.slice(0,1);
      })
    }
  },
  methods:{
    shortcut(index){
      // 根据获取的index,去跳转到对应的歌手列表
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index]);
    },
    selectItem(item){
      // 向父组件派发事件
      this.$emit('showSelect',item);
    }
  }
}
  
</script>
<style scoped lang="stylus">
  @import "../common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>