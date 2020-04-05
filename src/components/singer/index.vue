<template>
    <div class="singer">
        <div class="waeper">
            <div class="left">
                <div v-for="(item,index) in menu" :key="index" class="menu">
                    <div class="menu-name">{{item.name}}</div>
                    <div v-for="(items,index) in item.data" :key="index" class="subMenu" @click="getdata(items.id)">
                        <div>{{items.name}}</div>
                    </div>
                </div>
            </div>
            <div class="cont right">
                <singers :singerlist="singerlist" :flag='flag' class="singers"></singers>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/until/api.js";
import loading from '@/components/loading'
import singers from '@/components/singers'
    export default {
        data(){
            return{
                menu:{
                    0:{
                        name:'推荐歌手',
                        data:{
                            0:{name:'入驻歌手',id:5001}
                        }
                    },
                    1:{
                        name:'华语歌手',
                        data:{
                            0:{name:'华语男歌手',id:1001},
                            1:{name:'华语女歌手',id:1002},
                            2:{name:'华语组合/乐队',id:1003},
                        }
                    },
                    2:{
                        name:'欧美歌手',
                        data:{
                            0:{name:'欧美男歌手',id:2001},
                            1:{name:'欧美女歌手',id:2002},
                            2:{name:'欧美组合/乐队',id:2003},
                        }
                    },
                    3:{
                        name:"日本歌手",
                        data:{
                            0:{name:'日本男歌手',id:6001},
                            1:{name:'日本女歌手',id:6002},
                            2:{name:'日本组合/乐队',id:6003},
                        }
                    },
                    4:{
                        name:'韩国歌手',
                        data:{
                            0:{name:'韩国男歌手',id:7001},
                            1:{name:'韩国女歌手',id:7002},
                            2:{name:'韩国组合/乐队',id:7003},
                        }
                    },
                    5:{
                        name:'其他歌手',
                        data:{
                            0:{name:'其他男歌手',id:4001},
                            1:{name:'其他女歌手',id: 4002},    
                            2:{name:'其他组合/乐队 ',id: 4003},
                        }
                    }                              
                },
                id:5001,
                singerlist:{},
                flag:false
            }
        },
        name:'singer',
        components:{
            loading,
            singers
        },
        mounted() {
            this.getdata(this.id)
        },
        methods:{
            getdata(id) {
                this.flag = false
                api.api(`/artist/list?cat=${id}`, `singerlist${id}`).then(data => {  
                    if(data.code == 200){
                        console.log(data);
                        this.flag = true
                        this.singerlist = data.artists
                    }
                });
            },
        }

    }
</script>

<style lang="scss" scoped>
.singer{width: 100%; display: flex;justify-content: center;}
.waeper{min-width: 900px;display: flex;padding: 0 50px;}
.left{float: left; width: 25%;background-color: rgb(253, 251, 251);}
.right{float: right;width: 75%;}
.menu{ box-sizing: border-box; cursor: pointer; width: 100%;padding:5px 10px;margin-bottom: 5px;text-align: left;}
.menu-name{box-sizing: border-box;padding: 0 5px; border-bottom: 1px solid #ccc;height: 30px;line-height: 30px;font-size: 16px;font-weight: bold;}
.subMenu{height: 20px;line-height: 20px;font-size: 13px;padding: 0 10px;box-sizing: border-box}
.subMenu:hover{color: red;border: 1px solid #ccc;line-height: 17px;}
.singers{width: 100%;}
</style>