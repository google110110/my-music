module.exports = {
    devServer: {
      //反向代理
      proxyTable: {
        '/api' : {
          target : 'https://music.163.com/api',
          changeOrigin : true,
          secure : true,
          pathRewrith : {
            '^/api' : '/api'
          }
      }
      }
    }
  }