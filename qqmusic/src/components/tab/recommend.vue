<template>
  <div class="recommend">
    <Scroll :data='hotPlayList' class='recommend-content'>
      <div>
        <!-- 轮播图 -->
        <div class='slider-wrapper'>
          <Slide :show-slide='slideList'></Slide>  
        </div>
        <!-- 热门歌曲列表 -->
        <div class='recommend-list'>
          <h1 class='list-title'>热门歌曲推荐</h1>
          <ul>
          <li v-for='items in hotPlayList' class='item'>
            <div class='icon'>
              <img v-lazy="items.imgurl" width='60' height='60'>
            </div>
            <div class='text'>
              <h2 class='name'>{{items.creator.name }}</h2>
              <p class='desc'>{{ items.dissname }}</p>
            </div>
          </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <!-- loading  -->
    <div class='loading-container' v-show='!hotPlayList.length'>
      <Loading></Loading>
    </div> 
  </div>
</template>

<script>
import { getSlide, getHotPlayList } from "../../api/recommend.js";
import { ERR_OK } from "../../config/conf.js";
import Slide from "../../base/slide";
import Scroll from "../../base/scroll";
import Loading from "../../base/loading";

export default {
  data() {
    return {
      slideList: [], // 报错轮播数据
      hotPlayList: []
    };
  },
  created() {
    // 钩子函数中不写大段逻辑
    this._getSlide();
    this._getHotPlayList();
  },
  methods: {
    // 定义一个私有方法，执行接口的调用，处理数据
    _getSlide() {
      getSlide().then(res => {
        if (res.code === ERR_OK) {
          this.slideList = res.data.slider;
        }
      });
    },
    _getHotPlayList() {
      getHotPlayList().then(res => {
        if (res.code === ERR_OK) {
          this.hotPlayList = res.data.list;
        }
      });
    }
  },
  components: {
    Slide,
    Scroll,
    Loading
  }
};
</script>

<style scoped lang="stylus" >
@import '../../common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>