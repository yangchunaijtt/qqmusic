import { PLAY_MODE } from '../config/conf';
// 设置 state 存放数据状态 singer 
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  orderList: [],
  playMode: PLAY_MODE.order,
  currentIndex: -1
}

export default state;
