// import Jsonp from '../common/js/jsonp';
import { commonParams } from '../config/conf';
import Axios from 'axios';

const getHotKey = ()=>{
  const url = `/splcloud/fcgi-bin/gethotkey.fcg`;
  const data = Object.assign({},commonParams,{
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    format:'json'
  });
  return Axios.get(url,{
    params: data
  }).then(res=>{
    return Promise.resolve(res.data)
  })  
}

const getSuggestList = (query,page)=>{
  const url = `/soso/fcgi-bin/search_for_qq_cp`;
  const data = Object.assign({},commonParams,{
    w: query,
    p: page,
    // 表示是否显示歌手
    catZhida: 1,
    uin: 0,
    format: 'json',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    remoteplace: 'txt.mqq.all',
  });
  return Axios.get(url,{
    params: data
  }).then(res=>{
    return Promise.resolve(res.data)
  })  
}

export {
  getHotKey,
  getSuggestList
}