/* singer页面相关请求接口 */
import {
  commonParams
} from '../config/conf';
import Axios from 'axios';


// 定义一个请求歌手列表接口
const getSingerList = () => {
  const url = '/v8/fcg-bin/v8.fcg';
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    format: 'json'
  })
  return Axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
// 定义一个请求歌手详情的接口
const getSongs = (singermid) => {
  const url = `/v8/fcg-bin/fcg_v8_singer_track_cp.fcg`;
  const data = Object.assign({}, commonParams, {
    singermid: singermid,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1,
  });
  return Axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 定义一个请求 vkey 的方法 
const getVkey = (songmid) => {
  const url = '/cgi-bin/musicu.fcg';
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"5742978085","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"5742978085","songmid":["${songmid}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}`
  });
  return Axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  })
}

export {
  getSingerList,
  getSongs,
  getVkey
}