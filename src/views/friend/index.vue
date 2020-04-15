<template>
    <div :style="'min-width:'+w+'px;height:'+(h-60)+'px;'" class="player-warper">
        <player class="peryer" ></player>
    </div>
</template>

<script>
import api from "@/until/api.js";
import loading from '@/components/loading'
import player from '@/components/player'
import Vue from 'vue'
    export default {
         data(){
             return{
                 flag : true,
                 h : 0,
                 w : 0
             }
         },
        name:'friend',
        components:{
            loading,
            player
        },
        mounted() {
            this.h = window.innerHeight
            this.w = window.innerWidth
        },
    }
</script>

<style lang="scss" scoped>
.player-warper{background-color: rgb(233, 223, 206);min-width: 1000px;}
.peryer{min-width: 100%;height: 100%;}
</style>