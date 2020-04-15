<template>
    <div class="collection-warper">
        <div class="label"> 
            <img src="@/assets/images/rec/music.png" alt="">
            <span>热门歌单</span>
        </div>
        <div class="dis-f">
            <div class="collection-centent" v-if="personalized.length">
                <div v-for="(item , index) in personalized" :key="index" class="collection" @click="getsonglidt(item)">
                    <collection :songlist = "item"></collection>
                </div>
            </div>
            <div v-else class="loading">
                <loading></loading>
            </div>
        </div>
        <div class="label"> 
            <img src="@/assets/images/rec/music.png" alt="">
            <span>热门新歌</span>
        </div>
        <div class="dis-f">
            <div class="collection-centent" v-if="newsongs.length">
                <div v-for="(item , index) in newsongs" :key="index" class="collection" @click="getid(item)">
                    <collection :songlist = "item"></collection>
                </div>
            </div>
            <div v-else class="loading">
                <loading></loading>
            </div>
        </div>
        
    </div>
</template>

<script>
import collection from '@/components/collection'
import loading from '@/components/loading'
import api from '@/until/api'
export default {
    data(){
        return{
            personalized:{},
            newsongs:{}
        }
    },
    name : 'res',
    components:{
        collection,
        loading
    },
    mounted () {
        this.pers()
        this.getnewsongs()
    },
    methods : {
        api(url,name) {
            return new Promise((res,rej)=>{
                var p = window.sessionStorage.getItem(name)
                if(p){ 
                    console.log(name+'本地存储')
                    res(JSON.parse(p))
                }else{
                    this.axios.get(`https://autumnfish.cn${url}`)
                    .then(response => {
                        var result = response.data;
                        if (result.code == 200) {
                            window.sessionStorage.setItem(name, JSON.stringify(result.result));
                            console.log(name+"请求成功",result.result);
                            res(result.result) 
                        }
                    })
                    .catch(error => {
                        console.log("请求失败", error);
                    });
                }
            })
        },
        pers(){
            this.api('/personalized?limit=10','personalized').then((data)=>{
                this.personalized = data
            })
        },
        getnewsongs(){
            this.api('/personalized/newsong','newsongs').then((data)=>{
                this.newsongs = data
            })
        },
        getid(item){
            console.log(item.name);
            this.PLAYER.i = item.id
            this.PLAYER.SONG(item)
            // this.$router.push('/friend')
            // this.$router.push('/friend/'+item.id)
            this.$router.push({
                path: '/friend',
                query: {
                    id: item.id
                }
            })
        },
        getsonglidt(item){
            api.api(`/playlist/detail?id=${item.id}`,`playlist${item.id}`).then((data)=>{
                if(data.code == 200){
                    console.log(item.name);
                    var list = data.playlist.tracks
                    this.PLAYER.i = list[0].id
                    this.PLAYER.SONG(list[0])
                    this.PLAYER.SONGLIST(list)
                    // this.$router.push('/friend')
                    // this.$router.push('/friend/'+list[0].id)
                    this.$router.push({
                        path: '/friend',
                        query: {
                            id: list[0].id
                        }
                    })
                }
            })
        }
    },

}
</script>

<style lang="scss" scoped>
.label{display: flex; border-bottom: 2px solid rgb(236, 234, 234);width: 900px;height: 50px;font-size: 23px;line-height: 50px;text-align: left;}
.label img{height: 30px;width: 30px;margin: 10px 20px}
.collection-warper{min-width: 900px; display: flex;flex-direction: column;align-items: center;}
.dis-f{margin-bottom: 50px; width: 100%;justify-content: center;height: auto;display: flex;min-height: 300px;}
.collection-centent{max-width: 900px; min-width: 850px; display: flex;flex-wrap: wrap;justify-content: space-between;}
.collection{cursor: pointer; margin-top: 20px; padding:0 10px;}

.loading{position: relative;height: 300px;}
</style>