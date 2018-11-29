<template>
  <div ref='wrapper'>
    <slot></slot>  
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      // 监听滚动事件类型
      type: Number,
      default: 1
    },
    click: {
      // 是否启用click事件
      type: Boolean,
      default: true
    },
    data: {
      // 对数据变化进行监听
      type: Array,
      default: null
    }
  },
  methods: {
    _initScroll() {
      // 创建一个scroll实例对象，第一个参数是DOM元素
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });
    },
    enable() {
      // 启用 better-scroll
      this.scroll && this.scroll.enable();
    },
    disable() {
      // 禁用 better-scroll
      this.scroll && this.scroll.disable();
    },
    refresh() {
      // 刷新
      this.scroll && this.scroll.refresh();
    },
    // 滚动到，某个指定的元素
    scrollToElement(elem){
      this.scroll && this.scroll.scrollToElement(elem);
    }
  },
  watch: {
    // data内容发生改变时，重新计算高度
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  },
  mounted() {
    this._initScroll();
  }
};
</script>
