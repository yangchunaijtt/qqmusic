<template>
  <div class='singer'>
    <list-view :data='singerList' @showSelect='select'></list-view>
    <!-- 渲染出口 -->
    <transition name='slider'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getSingerList } from "../../api/singer";
import ListView from '../../base/listview';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      singerList: []
    };
  },
  components:{
    ListView
  },
  methods: {
    _getSingerList() {
      getSingerList()
        .then(res => {
          // res.data.list 原始数据，需要处理成我们需要的结构
          this.singerList = this.sortSingerList(res.data.list);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 专门处理歌手数据的方法
    sortSingerList(list) {
      const map = {
        // 包含hot和字母对应的歌手
        hot: {
          title: "热门",
          items: []
        }
      };
      list.forEach((valObj, index) => {
        // 获取 hot 
        if (index < 10) {
          map.hot.items.push({
            Fmid: valObj.Fsinger_mid,
            Fname: valObj.Fsinger_name,
            headImg: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${valObj.Fsinger_mid}.jpg?max_age=2592000` // 头像url
          });
        }
        // A ~ Z 字母对应歌手
        let key = valObj.Findex; // 字母 
        if(!map[key]){ // 如果map对象中没有对应的key就创建一个
          map[key] = { 
            title: key,
            items: []
          }
        }
        map[key].items.push({
          Fmid: valObj.Fsinger_mid,
          Fname: valObj.Fsinger_name,
          headImg: `http://y.gtimg.cn/music/photo_new/T001R150x150M000${valObj.Fsinger_mid}.jpg?max_age=2592000` // 头像url
        });
      });
      /* 我们希望得到一个有序的数组结构 */
      let hot = []; // 存放 热门 
      let ret = []; // 存放 A ~ Z 
      for(let key in map){
        let val = map[key];
        if(val.title.match(/[a-zA-Z]/)){// 匹配 A~Z 
          ret.push(val); 
        }else if(val.title === '热门'){
          hot.push(val); 
        } 
      }
      // ret 数组排序 A - Z  根据字符编码来排序
      ret.sort((a,b)=>{
        return a.title.charCodeAt(0) -        b.title.charCodeAt(0);
      })
      // 返回我们得到结果 - 数组
      return hot.concat(ret);
    },
    select(singer){
      // 设置路由的跳转，编程式路由 
      this.$router.push({
        path: `/singer/${singer.Fmid}`
      });
      // 设置 mutation type 的提交 setSinger 
      this.addSinger(singer);
    },
    // 设置 mutations
    ...mapMutations({
      addSinger: 'setSinger'
    })
  },
  created() {
    this._getSingerList();
  }
};
</script>

<style scoped lang="stylus" >
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
.slider-enter-active, .slider-leave-active{
  transition : all 0.3s ease;
}
.slider-enter, .slider-leave-to{
  transform : translate3d(100%,0,0);
}
</style>