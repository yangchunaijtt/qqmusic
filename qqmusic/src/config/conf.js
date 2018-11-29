// 定义一些配置规则 
// 设置 code 为常量
const ERR_OK = 0;

// 提取请求的公共参数 
const commonParams = {
  g_tk: 5381,
  format: 'jsonp',
  outCharset: 'utf-8',
  inCharset: 'utf-8',
  notice: 0
}

// 语义化播放模式
const PLAY_MODE = {
  order: 0,  // 顺序播放
  random: 1, // 随机播放
  loop: 2    // 循环播放
}

// 输出
export {
  ERR_OK,
  commonParams,
  PLAY_MODE
}