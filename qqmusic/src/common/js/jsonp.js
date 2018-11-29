// 引入 jsonp 依赖
import jsonpCode from 'jsonp';

// 创建一个 setJsonp 方法
// url: 路径  data: 参数  opts: jsonp(url,opts,fn) 
export default (url,data,opts) => {
  url += '?' + params(data);
  // 返回一个 promise 对象
  return new Promise((resolve,reject)=>{
    // 调用 jsonp 插件
    jsonpCode(url,opts,(err,res)=>{
      if(!err){
        resolve(res)
      }else{
        reject(err)
      }
    })
  }) 
};

// 解析 data, data 是以对象形式传入
function params(data){
  let urlData = '';
  if(typeof data === 'object'){
    for(let key in data){
      urlData += `&${key}=${data[key]}`;
    }
  }
  return urlData.slice(1);
};

