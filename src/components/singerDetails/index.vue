<template>
    <div class="warper bg_block" :style="'min-height:'+(h-90)+'px'">
        <div class="box ">
            <div class="message">
                <div v-if="songlist.artist" class=" c">
                    <img class="singerimg" :src="songlist.artist.picUrl" :alt="songlist.artist.name">
                    <div>
                        <h4>歌手:</h4>
                        <span>{{songlist.artist.name}}  <span v-if="songlist.artist.alias[0]">({{songlist.artist.alias[0]}})</span></span><br>
                    </div>
                </div>
                <div v-else class="loading">
                    <loading></loading>
                </div>
            </div>
            <div class="message">
                <div v-if="singersmessage.briefDesc">
                    <h4>歌手信息</h4>
                    <span>{{singersmessage.briefDesc}}</span>
                </div>
                <div v-else class="loading">
                    <loading></loading>
                </div>
            </div>
            <div class="message" v-show="singersmessage.introduction">
                <div v-if="singersmessage.introduction">
                    <h4>歌手经历({{singersmessage.introduction.length}})</h4>
                    <div v-for="(item ,index) in i" :key="index">
                        <span v-if="singersmessage.introduction[index]">{{index + 1}}.{{singersmessage.introduction[index].ti}}</span>
                        <span v-if="singersmessage.introduction[index]">{{singersmessage.introduction[index].txt}}</span>
                    </div>
                    <div class="more" @click="move">{{flag?'更多......':'收起'}}</div>
                </div>
                <div v-else class="loading">
                    <loading></loading>
                </div>
            </div>
            <div class="message" v-if="singersmessage.topicData">
                <div v-if="singersmessage.topicData">
                    <h4>{{singersmessage.topicData[0].categoryName}}</h4>
                    <span>{{singersmessage.topicData[0].title}}</span><br>
                    <span>{{singersmessage.topicData[0].summary}}</span><br>
                    <span>{{singersmessage.topicData[0].recmdTitle}}</span><br>
                    <span>{{singersmessage.topicData[0].mainTitle}}</span><br>
                    <span>{{singersmessage.topicData[0].recmdTitle}}</span><br>
                </div>
                <div v-else class="loading">
                    <loading></loading>
                </div>
            </div>
            <div class="message">
                <div v-if="songlist">
                    <h4>热门单曲</h4>
                    <div v-for="(item, index) in song" :key="index" class="song" @click="getsongid(item.id)">
                        <img :src="item.al.picUrl" :alt="item.name" class="left">
                        <div class="right">
                            <span v-if="item">{{item.al.name}}</span><br>
                            <span v-if="songlist.artist.name">{{songlist.artist.name}}</span>
                        </div>
                    </div>
                    <div class="more f-size" @click="moresong">更多.....</div>
                </div>
                <div v-else class="loading">
                    <loading></loading>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/until/api.js";
import loading from '@/components/loading'
import Vue from 'vue'
     export default {
         data(){
             return{
                 flag:true,
                 singersmessage:{},
                 songlist:{},
                 h : 0,
                 i : 1,
                 cont : '更多......',
                 j:0,
                 song:{}
             }
         },
        name:'singerDetails',
        components:{
            loading
        },
        // props:['id'],
        mounted() {
            this.getdata(this.id)
            this.getsonglist(this.id)
            this.h = window.innerHeight  
        },
        computed:{
            id(){
                return this.$route.params.id
            },
        },
        // catch:{
        //     id(newVal,oldVal){
        //         console.log('newVal', newVal)
        //         this.getdata(newVal)
        //     },
        // },
        methods:{
            getdata(id) {
                this.singersmessage = {}
                api.api(`/artist/desc?id=${id}`, `singersmessage${id}`).then(data => {  
                    if(data.code == 200){
                        console.log(data,id);
                        this.singersmessage = data
                    }
                });
            },
            getsongurl(id) {
                this.songurl = {}
                api.api(`/song/url?id=${id}`, `songurl${id}`).then(data => {  
                    if(data.code == 200){
                        let songurl = data.data
                        console.log('songurl',songurl,id);
                        if(songurl[0].url){
                            // this.PLAYER.getPlay(songurl)
                            this.PLAYER.i = id
                            this.PLAYER.SONG(songurl[0])
                            this.PLAYER.SONGLIST(this.songlist.hotSongs) 
                            console.log('歌曲地址',songurl[0].url);
                            // this.$router.push('/friend')
                            // this.$router.push('/friend/'+id)
                            this.$router.push({
                                path: '/friend',
                                query: {
                                    id: id
                                }
                            })
                        }else{
                            alert('该歌曲为至尊VIP,暂时无法为您提供播放')
                        }
                    }
                });
            },
            getsonglist(id) {
                this.songlist = {}
                api.api(`/artists?id=${id}`, `singersonglist${id}`).then(data => {  
                    if(data.code == 200){
                        console.log(data.hotSongs,id);
                        this.songlist = data
                        this.moresong()
                    }
                });
            },
            move(){
                var i = this.i
                this.flag = !this.flag
                if(i == 1){
                    this.i = this.singersmessage.introduction.length
                    return
                }
                this.i = 1
                return
            },
            moresong(){
                var j = this.j
                var s = this.songlist.hotSongs
                for(let i in s){
                    if(i > j && i < (j+5)){
                        Vue.set(this.song,i,s[i])
                    }
                    if(i == (j+4)){
                        this.j = j + 5
                        return
                    }
                }
            },
            getsongid(id){
                this.getsongurl(id)
                console.log(id);
            }
        }
    }
</script>

<style lang="scss" scoped>
.warper{width: 100%;display: flex;justify-content: center;color: white;font-size: 15px;text-align: left;}
.box{width: 900px;display: flex;flex-direction: column;align-items: center;}
.bg_block{background-color: #333;}
.message{width: 100%;border-radius: 5px;border: 1px solid #ccc;padding: 10px;margin-top: 10px;}
.message span{line-height: 30px;}
.message:hover{box-shadow: 2px 2px 2px 2px #ccc; h4{color: red;}}
.loading{position: relative;height: 600px;width: 100%;}
.more{font-size: 13px;font-weight: bold;cursor: pointer;}
.more:hover {color: red;}
.singerimg{width: 100px;height: 100px;border-radius: 2px; margin-right: 30px;}
.song{border-radius: 5px;width: 80%;margin-bottom: 10px; margin-left: 10%;border-top: 1px solid #ccc;border-left: 1px solid #ccc;border-bottom: 2px solid #ccc;border-right: 2px solid #ccc; display: flex;padding: 10px;box-sizing: border-box;justify-content: space-between;}
.song img{width: 100px;height: 100px;border-radius: 2px;float: left;}
.song .right{min-width: 100px; float: right;height: 100px;margin-right: 50px;text-align: center;display: flex;justify-content: center;flex-direction: column;align-items: center;}
.f-size{font-size: 17px;}
.song:hover{box-shadow: 2px 2px 2px 2px #ccc; cursor: pointer;}
.c{display: flex!important;}
</style>