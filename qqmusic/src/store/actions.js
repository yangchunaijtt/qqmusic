// 播放器触发时：需要提交一些列的mutation type , 可以通过action来封装多个 type 
// playList playing fullScreen currentindex orderList
const actions = {
  selectPlay({commit},{list,index}){
    commit('setPlayList',list);
    commit('setOrderList',list);
    commit('setCurrentIndex',index);
    commit('setFullScreen',true);
    commit('setPlaying',true);
  }
}

export default actions;