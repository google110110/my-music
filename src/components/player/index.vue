<template>
    <div class="fas" :style="'width:'+w+'px;'">
        <div :style="bgimage" class="box player-bg">
        </div>
        <div class="play" v-if="play">
            <div>
                <!-- <div class="name">{{song.name}}</div> -->
                <div class="name">{{play.name}}</div>
                <!-- <div ref="lyrics"></div> -->
                <betterScroll :maxHeight="(h-200)" ref="betterScrollBox">
                    <div class="f-color">
                        <div v-for="(item,index) in lines" :key="index" :class="{red : songtime == item.time}">
                            <!-- <span class="songlic">{{item.text}}</span> -->
                            <div class="songlic">{{item.text}}</div>
                        </div>
                    </div>
                </betterScroll>
            </div>
        </div>
        <div class="audio">
            <songAudio :nextSong="nextSong" :previousSong="previousSong" @ended="ended" :songurl="songurl.url" @newsongtime="newsongtime" :id="id" :list="list"></songAudio>
        </div>
        <div class="menulist" v-show="flag && songlist">
            <betterScroll :maxHeight="(h-110)" ref="listbetterScroll">
                <div>
                    <div class="gd gedan">歌单列表</div>
                    <div v-for="(item,index) in songlist" :key="index" :title="(n == item.id)? 'n':''" class="gedan" @tap="cutSong(item.id)">
                        <div>{{item.name}}</div>
                        <div>{{item.ar[0].name}}</div>
                    </div>
                </div>  
            </betterScroll>
        </div>
    </div>
    
</template>

<script>
import api from "@/until/api.js";
import VueAplayer from "vue-aplayer";
import betterScroll from "@/components/betterScroll";
import songAudio from "@/components/songAudio";
// import audioplayer from 'react-h5-audio-player'
    export default {
        data(){
            return{
                index:0,
                flag:true,
                byurl:'',
                playre : {},
                song : {},
                songlist : {},
                id:0,
                play:{},
                bgimage:'',
                songurl:{},
                songmessage:{},
                lines:{},
                h:0,
                w:0,
                songtime:0,
                n:'',
                el_alert:false
            }
        },
        name:'playre',
        components:{
            aplayer : VueAplayer,
            betterScroll,
            songAudio
        },
        watch: {
            '$route' (to, from) {
                if(to.path == '/friend'){
                    let id = this.$route.query.id
                    if(id){
                        this.cutSong(id)
                        this.songlist = this.PLAYER.SONGLIST()
                        this.song = this.PLAYER.SONG()
                        this.n = this.PLAYER.SONG().name
                        this.id = id
                        console.log('路由id变化',id);
                    }   
                }
            }
        },
        computed:{
            songs(){
                // return this.$route.params.id
                return this.song
            }
        },
        mounted(){
            this.h = window.innerHeight
            this.w = window.innerWidth
            this.songlist = this.PLAYER.SONGLIST()
            this.song = this.PLAYER.SONG()
            this.id = this.song.id
            this.getsongdata(this.id)
            this.getmp3url(this.id)
            console.log(this.song,this.songlist,this.id);
        },
        methods:{
            getsongdata(id){
                api.api(`/song/detail?ids=${id}`,`songDetails${id}`).then((data)=>{
                    // console.log(data,'-------------');
                    if(data.code == 200){
                        let song = data.songs[0]
                        console.log(song,'当前音乐信息',id);
                        if(song){
                            this.n = song.id
                            this.play = song
                            this.PLAYER.SONG(song)
                            this.bgimage = `background-image:url('${song.al.picUrl}') ;`
                        }
                    }
                })
            },
            getmp3url(id){
                api.api(`/song/url?id=${id}`,`newplaysong${id}`).then((data)=>{
                    if(data.code == 200){
                        console.log(data.data[0],'当前音乐',id);
                        this.songurl = data.data[0]
                    }
                })
                this.getsongmes(id)
            },
            getsongmes(id){
                api.api(`/lyric?id=${id}` ,`songmes${id}`).then((data)=>{
                    if(data.code == 200){
                        console.log(data,'音乐歌词',this.$refs.lyrics);
                        if(data.lrc){
                            this.songmessage = data.lrc.lyric
                            this.fetch(data.lrc.lyric)
                        }
                    }
                })
            },
            fetch: function (lrc) {
                this.lines = [];
                var lines = lrc.split("\n");
                for (var k in lines) {
                    var timeMatchs = lines[k].match(/\[(.*)\]/)
                    var timeMatch = lines[k].match(/\[(.*)\.(.*)\]/,'$1')
                    // if(timeMatch){
                    //     console.log(timeMatch[1]);
                        this.lines.push({
                            time: timeMatch ? timeMatch[1] : '',
                            text: lines[k].replace(/^.+?\]/, '')
                        })
                    // }
                    // this.lines.push({
                    // time: timeMatch ? timeMatch.pop() : '',
                    // text: lines[k].replace(/^.+?\]/, '')
                    // })
                }
            },
            newsongtime(data){
                // console.log(data);
                var lines = this.lines
                // this.songtime = data
                for(let i = 0;i < lines.length-1 ; i++){
                    // console.log(data);
                    if(lines[i].time <= data && data <= lines[i+1].time){
                        if(!lines[i].text){
                            this.songtime = lines[i-1].time
                            // console.log(lines[i].text);
                        }else{
                            this.songtime = lines[i].time
                            // console.log(lines[i].text);
                        }
                        // this.songtime = lines[i].time
                        // console.log(lines[i].text);
                        if(i>6 && i < (lines.length - 8)){
                            this.toScrollTO(i-6)
                        }
                        return
                    }
                    // if(i == lines.length-1){
                    //     this.songtime = lines[i].time
                    //     return
                    // }
                }
            },
            toScrollTO(i){
                var y= 30*i
                this.$refs.betterScrollBox.toScrollTo(-y)
            },
            list(){
                console.log('打开歌单');
                this.flag = !this.flag
            },
            cutSong(id){
                console.log(id);
                this.id = id
                this.getsongdata(id)
                this.getmp3url(id)
                // getsongdata
            },
            getindex(){
                var songlist = this.songlist
                var song = this.play
                for(let i in songlist){
                    if(songlist[i].id == song.id){
                        console.log(parseInt(i));
                        return parseInt(i)
                    }
                }
            },
            ended(){
                console.log('播放结束，开始下一首');
                this.nextSong()
            },
            previousSong(){
                var i = this.getindex()
                var songlist = this.songlist
                if(songlist[i-1]){
                    console.log('上一首开始播放',songlist[i-1].name);
                    this.cutSong(songlist[i-1].id)
                }else{
                    console.log('这是歌单第一首了');
                    alert('这是歌单第一首了')
                } 
            },
            nextSong(){
                var i = this.getindex()
                var songlist = this.songlist
                if(songlist[i+1].id){
                    console.log('下一首开始播放',songlist[i+1].name);
                    this.cutSong(songlist[i+1].id)
                }else{
                    alert('这是最后一首了');
                } 
            },
            
        }
    }
</script>

<style lang="scss" scoped>
.fas{position: relative;width: 100%;height: 100%;min-width: 1000px;}
.player-bg{width: 100%;min-width: 1000px; height: 100%;filter: blur(5px);opacity: 1;background-repeat: no-repeat;background-position: center;background-size: 100%;background-attachment:fixed;}
.play{ display: flex;flex-direction: column; width: 80%;height: 100%;position: absolute;top: 0;left: 10%;border: 1px solid #333;box-shadow: 1px 1px 1px 1px #333; border-radius: 1px;padding: 10px 20px;box-sizing: border-box;}
.f-color{color: white;font-weight: 4px;}
.songlic{width: 100%; min-height: 30px;line-height: 30px;letter-spacing:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.name{font-size: 20px;font-weight: bold;color: rgb(241, 65, 65);line-height: 70px;}
.audio{position: absolute;height: 50px;bottom: 0;left: 0;width: 100%;}
// .aplayer{height: 50px;}
.red{color: brown;font-weight: bold;font-size: 22px;letter-spacing:5px;line-height: 50px;}
.menulist{position: absolute;top: 0;right: 0;width: 300px;padding: 0 10px;border-left: 1px solid #ccc;background-color: rgba(254,219,207,0.5);opacity: 0.8;box-shadow: -1px -1px 1px 1px #333;}
.gedan{font-weight: bold; display: flex;height: 30px;cursor: pointer; box-sizing: border-box;padding: 0 10px;}
.gedan div{text-align: left; width: 40%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height: 30px;font-size: 13px;}
.gedan:hover{box-shadow: -1px -1px 1px 1px #333;color: red;font-weight: bold;}
.gd{text-align: center;font-weight: bold; color: brown;}
.menulist{transition: 0.8s all ease;}
[title="n"]{color: red;background-color: rgb(243, 177, 79);}
.elalert{position: absolute;top: 50%;}
</style>