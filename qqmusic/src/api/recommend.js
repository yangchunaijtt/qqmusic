import axios from 'axios';
// 请求 轮播图 数据
const getSlide = () => {
  return axios.get('/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
    params: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1
    }
  }).then((res) => {
    // 返回 promise 对象
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  })
};

// 获取热门歌曲列表 
const getHotPlayList = () => {
  return axios.get('/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', {
    params: {
      platform: 'yqq',
      hostUin: 0,
      sin: 0,
      ein: 29,
      sortId: 5,
      categoryId: 10000000,
      rnd: Math.random(),
      format: 'json',
      notice: 0,
      uin: 0,
      g_tk: 5381,
      needNewCode: 0
    }
  }).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    console.log(err);
  })
}

// 输出接口
export {
  getSlide,
  getHotPlayList
}