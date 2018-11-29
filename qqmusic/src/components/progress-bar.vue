<template>
  <!-- 进度条的总宽度 -->
  <div class="progress-bar" ref="progressBar" @click='clickProgressBar'>
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent='touchStart'
        @touchmove.prevent='touchMove'
        @touchend.prevent='touchEnd'
      >
        <!-- 小圆球的宽度 16px -->
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    percent:{
      type: Number,
      default : 0
    }
  },
  created(){
    this.touch = {} // 存放事件需要的数据
  },
  methods:{
    touchStart(e){
      // 定义一个标志位 isStart 
      this.touch.isStart = true;
      // 记录 起始坐标 startX
      this.touch.startX = e.touches[0].pageX;
      // 记录当前进度条的进度 left
      this.touch.left = this.$refs.progress.clientWidth;
    },
    touchMove(e){
      if(!this.touch.isStart){
        return;
      }
      // 记录滑动距离 distanceX 
      let distanceX = e.touches[0].pageX - this.touch.startX;
      // 记录 真正的播放进度 
      let offsetWidth =Math.min(this.$refs.progressBar.clientWidth - 16,Math.max(0, distanceX + this.touch.left)) 
      ;
      // 调用偏移方法
      this._offset(offsetWidth); 
    },
    touchEnd(e){
      this.touch.isStart = false;
      // 事件结束后，我们要向player组件派发一个事件，告诉当前的播放百分比 
      // percent = 当前播放进度 / 进度总长度
      this.triggerPercent();
    },
    _offset(offsetWidth){
      this.$refs.progressBtn.style.transform = `translateX(${ offsetWidth }px)`;
      this.$refs.progress.style.width = offsetWidth + 'px';
    },
    triggerPercent(){
      const barWidth = this.$refs.progressBar.clientWidth - 16;
      const percent = this.$refs.progress.clientWidth / barWidth;
      this.$emit('percentChange', percent);
    },
    // 点击 progressBar
    clickProgressBar(e){
      this._offset(e.offsetX);
      this.triggerPercent();
    }
  },
  watch:{ // 监听 歌曲播放百分比变化
    percent(newP){
      // 判断 如果当前在 touch 就停止 watch
      if(newP >= 0 && !this.touch.isStart){
        // 获取 progressBar 的总宽度
        const width = this.$refs.progressBar.clientWidth - 16;
        // 获取移动偏移值
        const offsetWidth = width * newP;
        // 调用偏移方法
        this._offset(offsetWidth);
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>