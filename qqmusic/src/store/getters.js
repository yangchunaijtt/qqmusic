// 定义 获取state 状态的方法
const getters = {
  singer(state){
    return state.singer;
  },
  playing(state){
    return state.playing;
  },
  fullScreen(state){
    return state.fullScreen;
  },
  playList(state){
    return state.playList;
  },
  orderList(state){
    return state.orderList;
  },
  playMode(state){
    return state.playMode;
  },
  // 根据当前索引获取当前歌曲 currentSong
  currentSong(state){
    return state.playList[state.currentIndex]||{};
  },
  currentIndex(state){
    return state.currentIndex;
  }
}

export default getters;