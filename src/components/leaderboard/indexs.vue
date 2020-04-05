<template>
<div class="fas">
    <div class="mv-warper" v-if="rout">
        <div class="table">MV推荐 <span @click="getrout('/recommend/leaderboard/mv')">更多</span></div>
        <div class="mv-cont" v-if="mvlist.data">
            <!-- <div v-for="(item , index) in mvlist.data" :key="index" class="mv" @mouseout="flag= 0 " @mouseover="flag = item.name">
                <img :src="item.cover" alt="">
                <div class="cont">
                    <span>{{item.name}}·{{item.artistName}}</span>
                </div>
                <div class="play" v-show="item.name != flag">
                    <img src="@/assets/images/icon/play.png" alt="">
                </div>
            </div> -->
            <div v-for="(item , index) in mvlist.data" :key="index">
                <videoComponents :mvdata="item"></videoComponents>
            </div>
        </div>
        <div v-else class="loading">
            <loading></loading>
        </div>
        <div class="table">最新MV<span @click="getrout('/recommend/leaderboard/newmv')">更多</span></div>
        <div class="mv-cont" v-if="newmv.data">
            <!-- <div v-for="(item , index) in newmv.data" :key="index" class="mv" @mouseout="flag = 0 " @mouseover="flag = item.name">
                <img :src="item.cover" alt="">
                <div class="cont">
                    <span>{{item.name}}·{{item.artistName}}</span>
                </div>
                <div class="play" v-show="item.name != flag">
                    <img src="@/assets/images/icon/play.png" alt="">
                </div>
            </div> -->
            <div v-for="(item , index) in newmv.data" :key="index">
                <videoComponents :mvdata="item"></videoComponents>
            </div>
        </div>
        <div v-else class="loading">
            <loading></loading>
        </div>
        <div class="table">网易出品MV<span @click="getrout('/recommend/leaderboard/wymv')">更多</span></div>
        <div class="mv-cont" v-if="wymv.data">
            <!-- <div v-for="(item , index) in wymv.data" :key="index" class="mv" @mouseout="flag= 0 " @mouseover="flag = item.name">
                <img :src="item.cover" alt="">
                <div class="cont">
                    <span>{{item.name}}·{{item.artistName}}</span>
                </div>
                <div class="play" v-show="item.name != flag">
                    <img src="@/assets/images/icon/play.png" alt="">
                </div>
            </div> -->
            <div v-for="(item , index) in wymv.data" :key="index">
                <videoComponents :mvdata="item"></videoComponents>
            </div>
        </div>
        <div v-else class="loading">
            <loading></loading>
        </div>
    </div>
    <router-view class="router-mv" :getrout="getrout" v-else></router-view>
</div>
    
</template>

<script>
import api from "@/until/api.js";
import loading from '@/components/loading'
import videoComponents from '@/components/videoComponents'
    export default {
        data(){
            return{
                mvlist:{},
                newmv:{},
                wymv:{},
                flag:'',
                rout:true
            }
        },
        name: "songle",
        components:{
            loading,
            videoComponents
        },
        props: {
            // song: {
            //     type: Object,
            //     default: {}
            // }
        },
        mounted() {
            this.getdata(10)
            this.getnew(10)
            this.getwymv(5)
        },
        methods: {
            getdata(num) {
                api.api(`/top/mv?limit=${num}`, `mvlist${num}`).then(data => {
                    if(data.code == 200){
                        this.mvlist = data
                    }
                });
            },
            getnew(num){
                api.api(`/mv/first?limit=${num}`, `newmv${num}`).then(data => {
                    if(data.code == 200){
                        this.newmv = data
                    }
                });
            },
            getwymv(num){
                api.api(`/mv/exclusive/rcmd?limit=${num}`, `wymv${num}`).then(data => {
                    if(data.code == 200){
                        this.wymv = data
                    }
                });
            },
            getrout(url){
                this.rout = !this.rout
                console.log(this.rout);
                this.$router.push(url)
            }
        }
    }
</script>

<style lang="scss" scoped>
.fas{display: flex;justify-content:center; width: 100%;position: relative;}
.mv-warper{border: 1px solid #ccc; padding: 0 50px; width: 900px; display: flex;justify-content: center;flex-direction: column;align-items: center;}
.mv-cont{ width: 900px;display: flex;flex-wrap: wrap;justify-content: space-around;}
.mv{cursor: pointer; position: relative; border-radius: 3px;width: 150px;height: 190px;margin: 0 15px;margin-bottom: 20px;margin-top: 10px;border: 1px solid #ccc;border-top: 0; box-sizing: border-box;}
.mv:hover{box-shadow: 2px 2px 2px 2px #ccc;}
.mv img{width: 148px;height: 148px;border-radius: 3px;}
.mv .cont{display: flex;justify-content: space-around; font-size: 14px;font-weight: bold;height: 40px;line-height: 40px;}
.mv .cont span{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.loading{position: relative;height: 300px;}
.table{width: 870px;border-bottom: 2px solid red; font-size: 20px;color: saddlebrown;font-weight: bold;text-align: left;height: 50px;line-height: 50px;}
.table span{border-radius: 2px; cursor: pointer;  float: right;height: 50px;line-height: 50px;font-size: 13px;background-color: rgb(235, 228, 228);padding: 0 20px;}
.table span:hover{border-radius: 3px;background-color: rgb(165, 108, 66); color: red;}
.play{position: absolute;top: 0;left: 0;width: 100%;height: 100%;}
.play img{margin: auto;width: 50px; height: 50px;margin-top: 50px;}
.router-mv{width: 100%;margin: 0;}
</style>