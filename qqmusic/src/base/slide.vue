<template>
  <div class="slider">
    <swiper class="slider-group" :options='swiperOption'>
      <swiper-slide class='slider-item' v-for='item in showSlide'>
        <img :src='item.picUrl'>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// 引入 swiper 样式 和 组件
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      swiperOption: {
        //设置分页样式
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          delay: 3000,
          // 操作是否继续播放
          disableOnInteraction:false
        },
        loop: true, // 轮播
      }
    };
  },
  props: {
    showSlide: {
      type: Array,
      default: []
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style scoped lang="stylus">
@import '../common/stylus/variable.styl';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>