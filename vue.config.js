module.exports = {
  devServer: {
    // proxy: {
    //   '/api':{
    //       target:'http//196.128.6.23',
    //       changeOrigin:true
    //   }
    // }
  },
  // lintOnSave: true,
  //   css: {
  //       loaderOptions: {
  //           postcss: {
  //               plugins: [
  //                   require('postcss-px2rem')({remUnit: 75}),
  //               ]
  //           }
  //       }
  //   },
  //项目根路径的问题
  publicPath:'/my-music/dist'
  // publicPath:'./',
  // baseUrl: './',
}