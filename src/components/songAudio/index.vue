<template>
    <div class="sudios">
        <!-- <audio autoplay @emptied="emptied" @ended="ended" @play="play1" @pause="pause1" @error="error" @timeupdate="timeupdate" @canplay="canplay" :src="songurl" muted preload ref="song" ></audio> -->
        <audio autoplay @emptied="emptied" @ended="ended" @play="play1" @pause="pause1" @error="error" @timeupdate="timeupdate" @canplay="canplay" :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`" muted preload ref="song" ></audio>
        <!-- autoplay -->
        <!-- <audio @abort="error(e)" @error="error(e)" @timeupdate="timeupdate" @canplay="canplay" :src="url" muted preload ref="song" ></audio> -->
        <div class="play right">
            <img @click="previousSong" src="@/assets/images/song/left.png" alt="">
            <img @click="songplay()" :src="play?p[0]:p[1]" alt="">
            <img @click="nextSong" src="@/assets/images/song/right.png" alt="">
        </div>
        <div class="t">
            <div class="div nt"> {{nt}}</div>
            <progressbar :w='400' :run="run"></progressbar>
            <div class="time div red">{{zt}}</div>
        </div>
        <div class="menu">
            <div :class="{bg:i=='1'}" @click="i='1'" @click.capture="playlist">
                <img src="@/assets/images/song/random.png" alt="">
                <!-- @click="playlist" -->
            </div>
            <div :class="{bg:i=='2'}" @click="i='2'" @click.capture="loop">
                <img src="@/assets/images/song/listloop.png" alt="">
                <!-- @click="loop" -->
            </div>
            <div @click="list" :class="{bg:falg}" @click.capture="falg = !falg">
                <img src="@/assets/images/song/list.png" alt="">
            </div>       
        </div>
    </div>
</template>

<script>
import progressbar from "@/components/progressbar";
    export default {
        data(){
            return{
                falg:true,
                w:0,
                time:0,
                play:true,
                p:[
                    require('@/assets/images/song/suspend.png'),
                    require('@/assets/images/song/broadcast.png')
                ],
                currentTime:0,
                newtime:0,
                setnew:'',
                i:1,
                newsongtime:0,
                // url:this.songurl || this.PLAYER.SRC(),
                url:this.songurl,
                l:this.songurl,
                el_alert:false
            }
        },
        name:'audios',
        // props:['songurl','playlist'],
        props:{
            songurl:{
                type:String,
                default:''
            },
            playlist:{
                type:Function,
                default: function(){}
            },
            list:{
                type:Function,
                default: function(){}
            },
            previousSong:{
                type:Function,
                default: function(){}
            },
            nextSong:{
                type:Function,
                default: function(){}
            },
            id:{
                type:Number,
                default:0
            }
        },
        components:{
            progressbar
        },
        computed:{
            src(){
                let id = this.ff
                return `https://music.163.com/song/media/outer/url?id=${this.id}.mp3`
            },
            run(){
                if(this.time){
                    return (this.newsongtime/this.time)*400
                }
            },
            zt(){
                if(this.time){
                    return Math.floor(this.time / 60) + ':'+ Math.floor(this.time % 60)
                }
            },
            nt(){
                let f = Math.floor(this.newsongtime / 60)
                let m = Math.floor(this.newsongtime % 60)
                if(f < 10){
                    f = '0'+f
                }
                if(m < 10){
                    m = '0'+m
                }
                return f + ':'+ m 
            }
        },
        watch:{
            $route(){

            }
        },
        mounted(){
            this.w = window.innerWidth
        },
        methods:{
            songplay(){
                if(this.play){
                    this.$refs.song.play()
                }else{
                    this.$refs.song.pause()
                }
                this.play = !this.play
            },
            canplay(){
                console.log('可以开始播放');
                this.time = this.$refs.song.duration
                this.currentTime = this.$refs.song.currentTime
                this.PLAYER.SRC(this.songurl)
            },
            loop(){
                this.$refs.song.loop = 'loop'
            },
            timeupdate(){
                this.newsongtime = this.$refs.song.currentTime    
                this.$emit('newsongtime',this.nt);     
            },
            error(e){
                this.open()
            },
            pause1(){
                this.play = true
            },
            play1(){
                this.play = false
            },
            ended(){
                console.log('播放结束');
                this.$emit('ended'); 
            },
            emptied(){
                // alert('当前没有歌曲在播放')
            },
            open() {
                this.$alert('当前音乐地址不可用，或者您还未选中音乐，换个试试吧', {
                confirmButtonText: '确定',
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
.sudios{width: 100%; display: flex;justify-content: center;align-items: center;background-color: #333;opacity: 1;min-width: 1000px;}
.play{display: flex;width: 25%;}
.play{height: 50px;display: flex;align-items: center;justify-content: center;}
.play img{width: 30px;height: 30px;margin-right: 20px;cursor: pointer;}
.right{float: right;}
.t{display: flex;justify-content: center;align-items: center;width: 50%;}
.t .div{padding: 0 10px; font-size: 13px;font-weight: bold; box-sizing: border-box;}
.red{color: black;}
.nt{margin-right: 10px;min-width: 50px;padding: 0;color: red;}
.menu{height: 50px;display: flex;align-items: center;width: 25%;}
.menu>div{height: 50px;width: 70px;cursor: pointer;display: flex;justify-content: center;align-items: center;}
.menu img{width: 25px;height: 25px;}
// .menu>div:hover{background-color: black;}
// .menu>div:nth-child(0):hover,.menu>div:nth-child(1):hover{background-color: black;}
.bg{background-color: black;}
.elalert{position: absolute;top: -500px;}
</style>