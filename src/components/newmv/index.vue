<template>
<div class="warper">
    <div class="box">
        <div class="table">最新MV <span @click="getrout('/recommend/leaderboard')">返回</span></div>
        <div class="mv">
            <div v-if="mvlist && flag" class="mv-cont">
                <div v-for="(item,index) in mvlist" :key="index" class="cont">
                    <videoComponents :mvdata="item"></videoComponents>
                </div>
            </div>
            <div v-else class="loading">
                <loading></loading>
            </div>
            <div class="load"><span @click="more(0)" class="hov">上一页</span> <span class="f-color">当前页数:{{pages - 1}}页</span><span class="hov" @click="more(1)">下一页</span></div>
        </div>
    </div>
</div>
    
</template>

<script>
import loading from '@/components/loading'
import api from "@/until/api.js"
import videoComponents from '@/components/videoComponents'
    export default {
        data(){
            return{
                mvlist:{},
                flag:false,
                pages:1
            }
        },
        name:'newmv',
        components:{
            loading,
            videoComponents
        },
        props:{
            getrout:{
                type:Function,
                default: function(){}
            }
        },
        mounted() {
            this.getdata(this.pages,15)
        },
        methods:{
            getdata(pages,num) {
                this.flag = false
                this.mvlist = {}
                api.api(`/mv/first?&limit=${num*pages}`, `newmvpages${pages}`).then(data => {
                    if(data.code == 200){
                        var j = 0
                        var n = 0
                        var mvlist = {}
                        for(let i in data.data){
                            let n = i
                            if(j >= num*(pages-1) && j < num*pages){
                                this.mvlist[n] = data.data[n]
                                this.flag = true
                            }
                            j++
                        }
                    }
                });
            },
            more(i){
                if(!i){
                    if(this.pages - 1){
                        this.pages--
                        this.getdata(this.pages,15)
                    }
                    
                }else{
                    this.pages++
                    this.getdata(this.pages,15)
                }
                
                // Object.assign()
            }
        }
    }
</script>

<style lang="scss" scoped>
.warper{width: 100%;display: flex;height: 100%;background-color: white;align-items: center;flex-direction: column;}
.box{padding: 0 10px;border: 1px solid #ccc;display: flex;align-items: center;flex-direction: column;}
.mv{display: flex;width: 900px;flex-direction: column;}
.mv-cont{display: flex;flex-wrap: wrap;}
.cont{height: 200px;}
.loading{position: relative;height: 600px;}
.table{width: 870px;border-bottom: 2px solid rgb(92, 61, 4); font-size: 20px;color: saddlebrown;font-weight: bold;text-align: left;height: 50px;line-height: 50px;}
.table span{border-radius: 2px; cursor: pointer;  float: right;height: 50px;line-height: 50px;font-size: 13px;background-color: rgb(235, 228, 228);padding: 0 20px;}
.table span:hover{border-radius: 3px;background-color: rgb(165, 108, 66); color: red;}
.load{height: 50px;font-size: 15px; cursor: pointer;margin-top: 20px;}
.load span{height: 100%;line-height: 50px;padding: 0 10px;font-weight: bold;margin-right: 20px;}
.f-color{color: red;}
.hov:hover{background-color:rgb(161, 160, 160);}
</style>