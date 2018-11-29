<template>
  <div class='music-list'>
    <div class='back' @click='back'>
      <i class='icon-back'></i>
    </div>
    <h1 class='title' v-html='title'></h1>
    <div class='bg-image' :style='bgImage' ref='bgImage'>
      <div class='filter'></div>
    </div>
    <!-- song-list 组件 -->
    <Scroll class='list' ref='list'>
      <div class='song-list-wrapper'>
        <song-list :songs='songs' @select='selectSong'></song-list> 
      </div>
    </Scroll>
  </div>
</template>

<script>
import songList from "./song-list";
import Scroll from "../base/scroll";
import { mapActions } from 'vuex';
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    },
    headImg: {
      type: String,
      default: ""
    }
  },
  components: {
    songList,
    Scroll
  },
  methods: {
    back() {
      // 编程式路由
      this.$router.back();
    },
    selectSong(song,index){
      // 改变播放器的几个状态
      /* 1. 设置 playList 和 orderList 
         2. 当前index == currentIndex 
         3. 设置 playing 为 true 
         4. 设置 fullScreen 为 true 
      */
     // 提交 action 方法 selectPlay
      this.selectPlay({
        list: this.songs, // 歌曲列表 30首
        index
      });
    },
    ...mapActions(['selectPlay'])
  },
  computed: {
    bgImage() {
      return `background-image:url(${this.headImg})`;
    }
  },
  mounted() {
    // 设置 list 的 top 值
    this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;
  }
};
</script>

<style scoped lang="stylus">
@import '../common/stylus/variable';
@import '../common/stylus/mixin';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    overflow hidden;
    .song-list-wrapper {
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>