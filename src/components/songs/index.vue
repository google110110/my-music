<template>
<div>
  <div class="wawrper" v-if="newdata.id == id">
    <div class="bg">
        <img :src="newdata.coverImgUrl" alt="">
        <div class="cont">
            <span>{{newdata.name}}</span>
            <div class="time">
                <img src="@/assets/images/icon/time.png" alt="">
                <span class="f-size">{{newdata.updateTime | time}}</span>
            </div>
        </div>
    </div>
    <div class="list-header">歌单列表</div>
    <div>
        <div v-for="(item , index) in newdata.tracks" :key="index" @click="getid(item)" class="song">
            <single :song="item">
              <div class="song-index">{{index}}</div>
            </single>
        </div>
    </div>
  </div>
  <div v-else class="loading">
      <loading></loading>
  </div>
</div>
</template>

<script>
import api from "@/until/api.js";
import single from '@/components/single'
import loading from '@/components/loading'
export default {
  data() {
    return {
      list: {},
    //   data:{},
    };
  },
  name: "songs",
  components:{
        single,
        loading
    },
  props: {
    newdata : {
      type : [Object,Array],
      default:{}
    },
    id : Number
  },
  mounted() {
    // setTimeout(()=>{
    //   console.log(this.newdata.name);
    // },2000)
  },
  computed: {
  },
  filters:{
        time(t){
            var date = new Date(t)
            var time1='最近更新:'+(date.getMonth()+1)+'月'+date.getDate()+'日'+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
            return time1
        }
    },
  methods: {
    getid(item){
      console.log(item.name);
      this.PLAYER.i = item.id
      this.PLAYER.SONG(item)
      this.PLAYER.SONGLIST(this.newdata.tracks)
      // this.$router.push('/friend')
      // this.$router.push('/friend/'+item.id)
      this.$router.push({
          path: '/friend',
          query: {
              id: item.id
          }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.wawrper{width: 100%;padding: 0 30px;box-sizing: border-box;}
.bg{width: 100%;display: flex;padding: 30px;}
.bg img{width: 150px;height: 150px;}
.bg .cont{display: flex;flex-direction: column; font-size: 18px;padding: 0 20px;}
.bg .cont>span{margin-top: 20px;font-weight: bold;}
.bg .cont .time{margin-top: 20px;height: 30px;display: flex;}
.bg .cont .time img{width: 20px; height: 20px;margin-top: 5px;}
.bg .cont .time span{line-height: 30px;}
.f-size{font-size: 13px;}
.list-header{border-bottom: 2px solid red; text-align: left;font-size: 20px;padding: 0 20px;box-sizing: border-box;}
.song-index{width: 30px;}
.loading{position: relative;height: 300px;}
.song{cursor: pointer;}
</style>