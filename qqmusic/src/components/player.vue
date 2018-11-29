<template>
<div class='player' v-show='playList.length>0'>
  <transition name='normal'>
    <!-- 全局状态 -->
    <div class='normal-player' v-show='fullScreen'>
      <div class='background'>
        <img width='100%' height='100%' :src='currentSong.img'>
      </div>
      <!-- 返回按钮和歌曲信息 -->
      <div class='top'>
        <div class='back' @click='toMini'>
          <i class='icon-back'></i>
        </div>
        <!-- 歌曲名 -->
        <h1 class='title'>
          {{currentSong.songname}}
        </h1>
        <!-- 歌手名 -->
        <h2 class='subtitle'>
          {{currentSong.singer}}
        </h2>
      </div>
      <!-- 中间播放的CD -->
      <div class='middle'>
        <div class='middle-l'>
          <div class='cd-wrapper'>
            <div class='cd' :class='rotateCD'>
              <img class='image' :src='currentSong.img'>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部的按钮 -->
      <div class='bottom'>
        <!-- 播放进度条  -->
        <div class='progress-wrapper'>
          <!-- 当前播放时间 -->
          <span class='time time-l'>
            {{ formatTime(this.currentTime) }}
          </span>
          <!-- 进度条显示 -->
          <div class='progress-bar-wrapper'>
            <progress-bar :percent='percent' @percentChange='changePercent'></progress-bar>  
          </div>
          <!-- 总时长 -->
          <span class='time time-r'>
            {{ formatTime(currentSong.interval) }}
          </span>
        </div>

        <div class='operators'>
          <!-- 播放模式 -->
          <div class='icon i-left'>
            <i :class='modeIcon' @click='changeMode'></i>
          </div>
          <div class='icon i-left'>
            <i class='icon-prev' @click='prevSong'></i>
          </div>
          <div class='icon i-center'>
            <i :class='playIcon' @click='togglePlay'></i>
          </div>
          <div class='icon i-right'>
            <i class='icon-next' @click='nextSong'></i>
          </div>
          <div class='icon i-right'>
            <i class='icon-not-favorite'></i>
          </div>
        </div>

      </div>
    </div>
  </transition>
  <transition name='mini'>
    <!-- mini 状态 -->
    <div class='mini-player' v-show='!fullScreen' @click='toFull'>
      <div class='icon'>
        <img width='40' height='40' :src='currentSong.img' :class='rotateCD'>
      </div>
      <div class='text'>
        <h2 class='name'>{{currentSong.songname}}</h2>
        <p class='desc'>{{currentSong.singer}}</p>
      </div>
      <div class='control'>
        <i :class='miniIcom' @click.stop='togglePlay'></i>
      </div>
      <div class='control'>
        <i class='icon-playlist'></i>
      </div>
    </div>  
  </transition>  
  <!-- audio 标签来播放歌曲 -->
  <audio :src="currentSong.url" ref='audio' @canplay="canplay" @timeupdate="timeUpdate" @ended='songEnd'></audio>
</div> 
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getVkey } from "../api/singer";
import { ERR_OK, PLAY_MODE } from "../config/conf";
import ProgressBar from './progress-bar';
export default {
  data(){
    return{
      songReady: false,
      // 当前播放时间
      currentTime: 0
    }
  },
  computed: {
    ...mapGetters([
      "fullScreen", 
      "currentSong",
      "playList",
      "playing",
      "currentIndex",
      "playMode",
      "orderList"
    ]),
    // 实现 播放 UI的切换 
    playIcon(){
      return this.playing ? 'icon-pause': 'icon-play';
    },
    miniIcom(){
      return this.playing ? 'icon-pause-mini': 'icon-play-mini';
    },
    // CD 背景效果 
    rotateCD(){
      return this.playing ? 'play' : 'play pause'
    },
    // 计算播放百分比 当前播放时间 /  总时长
    percent(){
      return this.currentTime /  this.currentSong.interval;
    },
    // 改变模式的样式
    modeIcon(){
      return this.playMode === PLAY_MODE.order ? "icon-sequence" : this.playMode === PLAY_MODE.loop ? "icon-loop": "icon-random";

    }
  },
  methods: {
    ...mapMutations([
      "setFullScreen", 
      "setSongUrl",
      "setPlaying",
      "setCurrentIndex",
      "setPlayMode",
      "setPlayList"
    ]),
    toMini() {
      // 提交 setFullScreen 切换到mini状态
      this.setFullScreen(false);
    },
    toFull() {
      this.setFullScreen(true);
    },
    _getVkey() {
      return new Promise((resolve,reject)=>{
        // 获取 vkey,传入当前的songmid
        getVkey(this.currentSong.songmid).then(res => {
          if (res.code === ERR_OK) {
            resolve(`http://dl.stream.qqmusic.qq.com/${res.req_0.data.midurlinfo[0].purl}`);
          }
        });
      })
    },
    /* 播放/暂停 */
    togglePlay(){
      this.setPlaying(!this.playing);
    },
    // 切换下一首歌
    nextSong(){
      // 判断歌曲是否可以切换 
      if(!this.songReady){
        return;
      }
      let index = this.currentIndex + 1;
      if(index === this.playList.length){
        index = 0;
      }
      // 设置 currentIndex ，改变 currentSong 
      this.setCurrentIndex(index);
      // 切歌时判断当前播放状态
      if(!this.playing){
        this.togglePlay();
      };
      this.songReady = false;
    },
    // 切换上一首歌
    prevSong(){
      // 判断歌曲是否可以切换 
      if(!this.songReady){
        return;
      }
      let index = this.currentIndex - 1;
      if(index === -1){
        index = this.playList.length - 1;
      }
      // 设置 currentIndex ，改变 currentSong 
      this.setCurrentIndex(index);
      // 切歌时判断当前播放状态
      if(!this.playing){
        this.togglePlay();
      }
      this.songReady = false;
    },
    // 准备就绪，可以播放
    canplay(){
      this.songReady = true;
    },
    // 当播放进度改变时
    timeUpdate(e){ // e
      // 获取 currentTime  
      this.currentTime = e.target.currentTime;
    },
    // 处理 当前时间的格式  m : s  01 : 10
    formatTime(time){ 
      time = Math.floor(time);
      let m = Math.floor(time / 60);
      let s = time % 60;
      return `${m<10 ? "0"+m : m}:${s<10 ? "0"+s : s}`;
    },
    changePercent(percent){
      // 得到新的 percent, 计算新的 currentTime
      // 当前播放进度 = 总时长 * 播放百分比
      this.$refs.audio.currentTime = percent * this.currentSong.interval; 
    },
    // 改变模式方法
    changeMode(){
      // 0 order  1 random  2 loop
      let mode = (this.playMode + 1) % 3; 
      this.setPlayMode(mode);
      // 实现playList列表的乱序
      let list = null;
      // 判断播放顺序 playMode 
      if(mode === PLAY_MODE.random){
        list = this.randomList(this.orderList);
      }else{
        list = this.orderList;
      }
      // 重置 当前歌曲
      this.resetCurrentIndex(list);
      // // 修改 playList  
      this.setPlayList(list);
    },
    // 处理数组的乱序 
    randomList(list){
      // 不能直接修改 orderList 的数据
      let _list = list.slice();
      for(let i=0; i<_list.length; i++){
         // 0 ~ i 之间生成一个随机整数
         let j = Math.floor(Math.random()*(i + 1));
         let subtemp = _list[i];
         _list[i] = _list[j];
         _list[j] = subtemp;
      }
      return _list;
    },
    // 切换模式，currentSong 是不变的
    resetCurrentIndex(list){
      let index = list.findIndex((item)=>{
        return item.songid === this.currentSong.songid;
      });
      // 提交 mutation type setCurrentIndex 
      // 重置 currentIndex  
      this.setCurrentIndex(index);
    },
    // 播放结束自动下一首
    songEnd(){
      if(this.playMode === PLAY_MODE.loop){
        // 循环播放 
        this.loopSong();
        return;
      }
      this.nextSong();
    },
    loopSong(){
      // 改变歌曲的当前播放时间
      this.$refs.audio.currentTime = 0;
      // 调用歌曲播放方法 
      this.$nextTick(()=>{
        this.$refs.audio.play();
      })
    }
  },
  watch: {
    // 监听currentSong的变化，只要有变化就发请求 执行getVkey
    currentSong(newSong,oldSong) {
      // 当歌曲的 songid 不变时，不执行逻辑
      if(newSong.songid === oldSong.songid){
        return;
      }
      this._getVkey().then(res=>{
        // 提交 setSongUrl, 设置currentSong的url
        this.setSongUrl(res);
        // DOM 加载完成之后执行
        this.$nextTick(() => {
          setTimeout(() => {
            if(this.songReady){
              this.$refs.audio.play();
            }
          }, 500);
        });
      })
    },
    // 监听 播放状态 playing 
    playing(bool){
      if(!this.songReady){
        return;
      }
      const audio = this.$refs.audio;
      console.log('444444444')
      this.$nextTick(()=>{ // 确保DOM更新之后再执行
        console.log('22222222')
        bool ? audio.play() : audio.pause(); // 暂停
      })
    }
  },
  components:{
    ProgressBar
  }
};
</script>
<style scoped lang="stylus" >
@import '../common/stylus/variable';
@import '../common/stylus/mixin';

.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;

            &.play {
              animation: rotate 20s linear infinite;
            }

            &.pause {
              animation-play-state: paused;
            }

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 38px;
          line-height: 30px;
          width: 38px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left;
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    /* mini fullScreen 之间的切换动画 */
    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }

    &.normal-enter, &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }

    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;

      img {
        border-radius: 50%;

        &.play {
          animation: rotate 10s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
      }

      .desc {
        no-wrap();
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }

    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;

      .icon-play-mini, .icon-pause-mini, .icon-playlist {
        font-size: 30px;
        color: $color-theme-d;
      }

      .icon-mini {
        font-size: 32px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>