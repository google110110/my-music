<template>
    <div>
        <div class="collection" v-if="songlist">
            <div class="div">
                <img :src="songlist.picUrl" alt="">
            </div>
            <span>{{songlist.name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                flag:false
            }
        },
        name : 'collection',
        props:{
            songlist: Object,
            // songlist:{
            //     type:Object,
            //     default:{}
            // },
        },
        songs: {
            food(){
                return this.songlist
            }
        },
        mounted () {
            // setTimeout(()=>{
            //     console.log(this.songlist);
            // },1000)
        },
    }
</script>

<style lang="scss" scoped>
.collection{width: 140px;height: 180px;border: 1px solid #ccc;overflow: hidden;cursor: pointer;}
.collection .div{width: 140px;height: 140px;overflow: hidden;position: relative;}
.collection .div img{width: 140px;height: 140px;transition: all 0.3s ease;position: absolute;top: 0;left: 0;}
.collection span{font-size: 13px;text-align: center;width: 140px;height: 40px;}
.collection:hover div img{width: 150px;height: 150px;left: -5px;top: -5px;}
</style>