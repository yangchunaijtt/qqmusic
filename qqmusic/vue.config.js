module.exports = {
  configureWebpack: {
    // 配置 devServer 
    devServer: {
      // 设置服务器端代理
      proxy: {  
        '/musichall':{
          target: 'https://c.y.qq.com',
          changeOrigin: true,
          // 绕过 referer 限制
          headers:{ 
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
          }
        },
        '/splcloud':{
          target: 'https://c.y.qq.com',
          changeOrigin: true,
          // 绕过 referer 限制
          headers:{ 
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
          }
        },
        '/v8':{
          target: 'https://c.y.qq.com',
          changeOrigin: true,
          // 绕过 referer 限制
          headers:{ 
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
          }
        },
        '/cgi-bin':{
          target: 'https://u.y.qq.com',
          changeOrigin: true,
          // 绕过 referer 限制
          headers:{ 
            referer: 'https://u.y.qq.com',
            host: 'u.y.qq.com'
          }
        },
        '/soso':{
          target: 'https://c.y.qq.com',
          changeOrigin: true,
          // 绕过 referer 限制
          headers:{ 
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
          }
        },
      },
      overlay: {
        errors: true
      }
    }
  }
}