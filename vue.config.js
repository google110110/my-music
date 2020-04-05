module.exports = {
    devServer: {
      //反向代理
      proxyTable: {
        // '/api' : {
        //     target : 'https://autumnfish.cn',
        //     changeOrigin : true,
        //     secure : true,
        //     // pathRewrith : {
        //     //   '/api' : '/api'
        //     // }
        // },
        '/api' : {
          target : 'https://music.163.com/api',
          changeOrigin : true,
          secure : true,
          pathRewrith : {
            '^/api' : '/api'
          }
      }
      }
    },
    //项目根路径问题
    // publicPath:'./',
    // baseUrl: './',
  }