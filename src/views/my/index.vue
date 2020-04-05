<template>
    <div class="warper" :style="'height:'+(h-60)+'px'">
        <div class="cont" v-if="songlist.length">
            <betterScroll :maxHeight="(h-60)">
                <div>
                    <div v-for="(item, index) in songlist" :key="index" class="songs" @tap="tapsong(item)">
                        <img :src="item.artists[0].img1v1Url" alt="">
                        <div>{{item.name}}</div>
                        <div>{{item.artists[0].name}}</div>
                    </div>
                </div>
            </betterScroll>
        </div>
        <div v-else class="loading">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import api from "@/until/api.js"
import betterScroll from "@/components/betterScroll";
import loading from "@/components/loading";
  export default {
    data() {
      return {
          songlist:{},
          h:0,
          w:0,
          list:[]
      };
    },
    components:{
            betterScroll,
            loading
        },
    computed:{
        value(){
            return this.$route.query.value
        }
    },
    mounted() {
        this.getsearchlist(this.value)
        this.h = window.innerHeight
        this.w = window.innerWidth
    },
    methods: {
      getsearchlist(value){
          console.log(value);
          api.api(`/search?keywords=${value}`, `/search?keywords${value}`).then(data => {
            console.log(data);
            if(data.code == 200){
                var d = data.result.songs
                this.songlist = d
                var list = {}
                for(let i in d){
                    this.list[i]= {
                        id : d[i].id,
                        name : d[i].name,
                        ar :[{name :d[i].artists[0].name}]
                    }
                    if(i == d.length - 1){
                        console.log(this.list);  
                    }
                }
            }
        })
      },
      tapsong(item){
        this.PLAYER.i = item.id
        this.PLAYER.SONG(item)
        this.PLAYER.SONGLIST(this.list)
        this.$router.push({
            path: '/friend',
            query: {
                id: item.id
            }
        })
        // var routerJump =this.$router.resolve({
        //         path: '/friend',
        //         query: {
        //             id: item.id
        //         }
        //     })
        // window.open(routerJump.href, '_blank')
      }
    },
  };
</script>

<style lang="scss" scoped>
.warper{width: 100%;display: flex;justify-content: center;background-color: burlywood;}
.warper .cont{min-width: 900px;display: flex;justify-content: center;}
.warper .cont .songs{cursor: pointer; height: 50px;width: 100%;display: flex;border-radius: 5px;box-sizing: border-box;border-top: 1px solid #333;border-bottom: 1px solid #333;}
.warper .cont .songs:hover{box-shadow: 2px 2px 1px 1px #333;color: red;}
.warper .cont .songs img{height: 50px;width: 50px;border-radius: 5px;margin-right: 10px;}
.warper .cont .songs div{height: 50px;border-radius: 5px;margin-right: 10px;padding: 0 10px;line-height: 50px;width: 200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.warper .box{min-width: 500px;height: 100%;}
.loading{position: relative;height: 300px;}
</style>