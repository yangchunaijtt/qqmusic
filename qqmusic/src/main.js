// 引入 babel-polyfill  补丁
import 'babel-polyfill';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueLazy from 'vue-lazyload';

// 引入全局样式 
import './common/stylus/index.styl';
// 整个body节点都没有click延时
import fastclick from 'fastclick';
fastclick.attach(document.body);

// 注册vue-lazyload 并使用默认图片
Vue.use(VueLazy,{
  loading: require('./common/images/default.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if(module.hot){
  module.hot.accept();
}