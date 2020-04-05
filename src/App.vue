<template>
  <div id="app">
    <div id="nav" class="allcenter">
      <div class="header-img allcenter">
        <img src="./assets/images/rec/music.png" alt="">
        <span class="f-white">Netease Cloud Music</span>
      </div>
      <router-link class="routerlink" tag='li' to="/recommend">推荐</router-link>
      <router-link class="routerlink" tag='li' to="/friend">音乐盒子</router-link>
      <!-- <router-link class="routerlink" tag='li' to="/my">我的</router-link> -->
      <div class="routerlink">
        <searchfor></searchfor>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import searchfor from '@/components/searchfor'
  export default {
    name:'app',
    components:{
            searchfor
        },
  }
</script>

<style lang="scss">
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  min-width: 900px;
  height: 60px;
  background-color: #333;
}
.routerlink{
  cursor: pointer;
  list-style: none;
  font-size: 17px;
  line-height: 60px;
  color: aliceblue;
  height: 60px;
  padding: 0 20px;
  // &.router-link-exact-active {
  //     background-color: brown;
  //   }
    &.router-link-active {
      background-color: black;
    }
}
.f-white{color: aliceblue;}
.allcenter{display: flex;justify-content: center;align-items: center;}
.routerlink:hover{
  // background-color: black;
  background-color: black;
}
.header-img{height: 60px;font-size: 25px;margin-right: 10px;}
.header-img img{height: 30px;width: 30px;margin-right: 10px;}
</style>
