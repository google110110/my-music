<template>
    <div>
        <div class="mv" @mouseout="flag= 0 " @mouseover="flag = mvdata.name" @click="play(mvdata)">
            <div class="img-d">
                <img :src="mvdata.cover" alt="">
            </div>
            <div class="cont">
                <span>{{mvdata.name}}·{{mvdata.artistName}}</span>
            </div>
            <div class="play" v-show="mvdata.name != flag">
                <img src="@/assets/images/icon/play.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                flag:''
            }
        },
        name:'videoComponents',
        props:['mvdata'],
        mounted(){
            
        },
        methods:{
            play(item){
                console.log(item.id,'111');
                // this.$router.push({
                //     path: `/recommend/leaderboard/vvideo/${item.id}`,
                // })
                // this.$router.push({
                //     path: '/recommend/leaderboard/vvideo',
                //     query: {
                //         id: item.id
                //     }
                // })
                var routerJump =this.$router.resolve({
                    path: '/recommend/leaderboard/vvideo',
                    query: {
                        id: item.id
                    }
                })
                window.open(routerJump.href, '_blank')
            }
        }
    }
</script>

<style lang="scss" scoped>
.mv{transition: all 0.3s ease; cursor: pointer; position: relative; border-radius: 3px;width: 268px;margin: 0 15px;margin-bottom: 20px;margin-top: 10px;border: 1px solid #ccc;border-top: 0; box-sizing: border-box;}
.mv:hover{box-shadow: 2px 2px 2px 2px #ccc;}
.mv .img-d{max-height: 155px;overflow: hidden;}
.mv .img-d img{width: 268px;border-radius: 3px;}
//.mv img{width: 148px;height: 148px;border-radius: 3px;}
.mv .cont{display: flex;justify-content: space-around; font-size: 14px;font-weight: bold;height: 40px;line-height: 40px;}
.mv .cont span{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.play{position: absolute;top: 0;left: 0;width: 100%;height: 100%; transition: all 0.5s ease;}
.play img{margin: auto;width: 50px; height: 50px;margin-top: 50px; transition: all 0.5s ease; transform: rotate(1.2);}
</style>