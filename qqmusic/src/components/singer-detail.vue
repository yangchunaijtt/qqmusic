<template>
  <div class='singer-detail'>
    <music-list :songs='songs' :title='getTitle' :headImg='getHead'></music-list>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSongs } from '../api/singer';
import { ERR_OK } from '../config/conf';
import Song from '../common/js/songs';
import musicList from './music-list';
export default {
  data(){
    return {
      songs: [], // 维护一个 songs 
    }
  },
  components:{
    musicList
  },
  computed:{
    ...mapGetters(['singer']),
    // 获取头像
    getHead(){
      return this.singer.headImg;
    },
    // 获取歌手名
    getTitle(){
      return this.singer.Fname;
    }
  },
  created(){
    this._getSongs()
  },
  methods:{
    _getSongs(){
      // 刷新返回上一级
      if(!this.singer.Fmid){
        this.$router.back();
        return;
      }
      // 调用获取歌曲的方法
      getSongs(this.singer.Fmid).then(res=>{
        if(res.code === ERR_OK){
          this.songs = this.sortSongs(res.data.list)
        }
      })
    },
    sortSongs(list){
      let ret  = [];
      list.forEach( item =>{
        // 利用解构赋值 提取 musicData 对象
        let  { musicData } = item;
        // 判断 songid 和 albummid
        if(musicData.songid && musicData.albummid){
          ret.push(Song(musicData));
        }
      })
      return ret;
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../common/stylus/variable"
  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
</style>