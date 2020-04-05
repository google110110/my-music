<template>
    <div>
        <div class="collection" v-if="songlist">
            <img :src="songlist.picUrl" alt="">
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
.collection img{width: 140px;height: 140px;}
.collection span{font-size: 13px;text-align: center;width: 140px;height: 40px;}
</style>