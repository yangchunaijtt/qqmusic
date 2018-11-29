// 定义 改变状态的方法
const mutations = {
  // setSinger 是mutation type 第二参数：payload 
  setSinger(state,singerObj){
    state.singer = singerObj;
  },
  // 播放器的状态 
  setPlaying(state,isPlay){
    state.playing = isPlay;
  },
  setPlayList(state, list){
    state.playList = list;
  },
  setFullScreen(state,isFull){
    state.fullScreen = isFull;
  },
  setOrderList(state,list){
    state.orderList = list;
  },
  setPlayMode(state,mode){
    state.playMode = mode;
  },
  setCurrentIndex(state,index){
    state.currentIndex = index;
  },
  // 给当前歌曲 currentSong 添加 url  
  setSongUrl(state, url){
    state.playList[state.currentIndex].url = url;
  }
} 

export default mutations;