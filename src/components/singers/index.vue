<template>
    <div class="fas">
        <!-- <div class="top f-color">TOP 10</div> -->
        <div v-if="singerlist && flag" class="warper">
            <div class="top f-color">TOP 10</div>
            <div v-for="(item,index) in top" :key="index" class="cont click" @click="getid(singerlist[index].id)">
                <img :src="singerlist[index].picUrl" alt="">
                <span>{{singerlist[index].name}}</span>
            </div>
        </div>
        <div v-else class="loading">
            <loading></loading>
        </div>
        <!-- <div class="top">全部歌手</div> -->
        <div v-if="singerlist && flag" class="warper">
            <div class="top">全部歌手</div>
            <div v-for="(item,index) in singerlist" :key="index" class="cont click" @click="getid(item.id)">
                <span class="f-size">{{item.name}}</span>
            </div>
        </div>
        <div v-else class="loading">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import loading from '@/components/loading'
import api from "@/until/api.js"
    export default {
        data(){
            return{
                top:10
            }
        },
        name:'singers',
        props:['singerlist','flag'],
        components:{
            loading
        },
        computed:{
        },
        mounted() {
        },
        methods:{
           getid(id){
               this.$router.push('/recommend/singerDetails/'+id)
           } 
        }
    }
</script>

<style lang="scss" scoped>
.loading{position: relative;height: 600px;width: 600px;}
.fas{width: 100%;display: flex;justify-content: center;flex-direction: column;align-items: center;}
.warper{width: 600px;display: flex;justify-content: center;flex-wrap: wrap;}
.cont{display: flex;flex-direction: column; margin: 0 10px 20px 10px;}
.cont span{height: 30px;line-height: 30px;font-size: 15px;font-weight: bold;}
.warper img{width: 100px;height: 100px;border-radius: 50%;}
.top{margin-bottom: 20px; padding: 0 10px; width: 100%;border-bottom: 2px solid rgb(110, 33, 33);font-weight: bold; height: 50px; font-size: 20px;line-height: 50px;text-align: left;}
.f-size{font-size: 13px !important; font-weight: normal;}
.f-color{color: red;}
.click{cursor: pointer;}
.click:hover{color: red;}
</style>