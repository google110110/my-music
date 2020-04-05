<template>
    <div class="warper" :style="'height:'+(h-90)+'px'">
        <video :src="url" autoplay controls class="VideoPlayer"></video>
        <!-- <videoPlayer  class="VideoPlayer" ref="videoPlayer" :playsinline="true" :options="playerOptions"></videoPlayer> -->
        <!-- <VideoPlayer  class="VideoPlayer" ref="videoPlayer" :playsinline="true" :options="playerOptions"></VideoPlayer> -->
    </div>
</template>

<script>
import videoPlayer from 'vue-video-player'
import api from "@/until/api.js"
    export default {
        data(){
            return{
                h:0,
                w:0,
                playerOptions:{
                    muted: true,
                    language: 'zh-CN',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    },
                    poster: "",
                },
                url:''
            }
        },
        name:'vvideo',
        props:[],
        components: {
            videoPlayer
        },
        computed:{
            id(){
                return this.$route.query.id
            }
        },
         watch: {
            '$route' (to, from) {
                if(to.path == '/recommend/leaderboard/vvideo'){
                    let id = this.$route.query.id
                    if(id){
                        this.videodata(id)
                        console.log('路由id变化',id);
                    }   
                }
            }
        },
        mounted(){
            this.videodata(this.id)
            this.h=window.innerHeight
            this.w=window.innerWidth
        },
        methods: {
            videodata(id) {
                api.api(`/mv/url?id=${id}`, `mvurl${id}`).then(data => {
                    if (data.code == 200) {
                        var url = data.data.url
                        if(url){
                            this.playerOptions.sources = [{
                                    type: "video/mp4",
                                    src: url
                                }]
                                this.url = url
                            console.log(this.playerOptions,url);
                        }else{
                            alert('该MV无法播放请换一首试试')
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
.warper{display: flex;justify-content: center;align-items: center; background-color: black;}
.VideoPlayer{width: 70%;border: 0;outline:none;}
</style>