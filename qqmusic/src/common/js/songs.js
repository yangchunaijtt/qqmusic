// 创建 一个 song 类 
/*  
我们需要在 musicData 中提取的字段：
  songid songmid singer songname
  albumname interval  img  url
*/
class Song {
  constructor({songmid,songid,albummid,singer,songname,albumname,interval,img}){
    this.songmid = songmid;
    this.songid = songid; // 歌曲唯一 id 标示
    this.albummid = albummid; // 拼接图片的字段
    this.singer =  singer; // 歌手
    this.songname = songname; // 歌名
    this.albumname = albumname; // 专辑名
    this.interval = interval; // 歌曲长度
    this.img = img; // 歌曲的背景图
    this.url = '';
  }
}
// 创建一个工厂方法 
export default (mData) => {
  return new Song({
    songmid: mData.songmid, // 歌曲源的拼接字符
    songid : mData.songid, // 歌曲唯一 id 标示
    albummid : mData.albummid, // 拼接专辑图片的字段
    singer : filterSinger(mData.singer), // 歌手
    songname : mData.songname, // 歌名
    albumname : mData.albumname, // 专辑名
    interval : mData.interval, // 歌曲长度
    img : `http://y.gtimg.cn/music/photo_new/T002R300x300M000${ mData.albummid }.jpg?max_age=2592000`, // 歌曲的背景图
    url: ''
  })
}

// 处理 singer 数组 
function filterSinger(singer){
  let ret = [];
  if(!singer){ // 不存在，就返回空字符串
    return '';
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join(' / ');
}