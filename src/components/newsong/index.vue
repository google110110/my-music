<template>
    <div class="warper">
        <div class="h2">欢迎来到热门电台</div>
        <!-- <div class="box" v-if="djlist && dj"> -->
        <div class="box" v-if="djlist.length && dj">
            <div class="div" v-for="(item,index) in dj" :key="index" @click="getdjid(item)">
                <img :src="item.dj.avatarUrl" :alt="item.dj.signature">
                <div class="cont">
                    <div>
                        <span class="span">{{item.rcmdtext}}</span>
                        <span class="span f-s12 f-color">{{item.name}}   <span class="f-size">({{item.category}})</span></span>
                    </div>
                    <div>
                        <span class="span time">{{item.createTime | time}}</span>
                    </div>
                    <!-- <div>{{item.dj.signature}}</div> -->
                </div>
            </div>
        </div>
        <div v-else class="loading">
            <loading></loading>
        </div>
        <div class="more" @click="moredj">加载更多......</div>
    </div>
</template>

<script>
import api from "@/until/api.js";
import loading from '@/components/loading'
import Vue from 'vue'
    export default {
        data(){
            return{
                djlist:{},
                dj:{},
                j:0
            }
        },
        nema:'dihot',
        components:{
            loading
        },
        mounted() {
            this.getnewsongs()
        },
        filters:{
            time(t){
                var date = new Date(t)
                // var time1='发布时间:'+date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
                var time1=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
                return time1
            }
        },
        methods:{
            getnewsongs(){
                api.api('/dj/hot','djlist').then((data)=>{
                    if(data.code){
                        // console.log('555',data.djRadios);
                        this.djlist = data.djRadios
                        this.moredj()
                    }
                })
            },
            moredj(){
                var j = this.j
                var s = this.djlist
                for(let i in s){
                    if(i > j && i < (j+7)){
                        Vue.set(this.dj,i,s[i])
                        // console.log(i);
                    }
                    if(i == (j+6)){
                        this.j = j + 6
                        return
                    }
                }
            },
            getdjid(item){
                console.log(item.name);
                this.PLAYER.i = item.id
                this.PLAYER.SONG(item)
                // this.$router.push('/friend')
                this.$router.push({
                    path: '/friend',
                    query: {
                        id: item.id
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.warper{width: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;}
.box{ width: 900px;padding: 10px;display: flex; background-color: white;justify-content: space-between;flex-wrap: wrap;}
.box .div{cursor: pointer;box-sizing: border-box; width: 50%;display: flex;box-sizing: border-box;padding: 10px 20px;}
.div img{height: 120px; width: 120px;}
.div div{margin-left: 20px; max-width: 70%; display: flex;justify-content: center;flex-direction: column;align-items: center;}
.span{line-height: 25px; min-width: 300px; text-align: left; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.more{cursor: pointer;width: 900px;height: 50px;line-height: 50px;font-weight: bold;padding: 0 20px;box-sizing: border-box;}
.more:hover{color: red;}
.f-size{font-size: 13px;font-weight: bold;}
.box .div:hover{box-shadow: 1px 1px 1px 1px rgb(184, 181, 181); transition: all 0.5s ease;}
// .box .div:hover img{transform: rotate(1.5);transition: all 0.3 ease;}
.f-color{color: red;}
.f-s12{font-size: 13px;font-weight: bold;}
.time{font-size: 13px;font-weight: bold;font-family: '楷体';}
// .cont{text-align: left;}
.h2{font-size: 20px;height: 50px;line-height: 50px; border-bottom: 2px solid rgb(224, 220, 220);width: 950px;text-align: left;padding: 0 50px;}
.loading{position: relative;height: 300px;width: 100%;}
</style>