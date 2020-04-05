<template>
    <div class="song">
        <slot></slot>
        <img :src="song.al.picUrl" alt="">
        <div class="cont">{{song.name}}</div>
        <div class="name">{{song.ar[0].name}}</div>
    </div>
</template>

<script>
    export default {
        name: "songle",
        props: {
            song: {
                type: Object,
                default: {}
            }
        },
        mounted() {

        },
    }
</script>

<style lang="scss" scoped>
    .song{height: 100%;padding: 10px;height: 50px;display: flex;font-size: 13px;line-height: 50px;border-bottom: 1px solid #ccc;}
    .song img{width: 50px;height: 50px;margin-left: 10px;}
    .song .name,.cont{ margin-left: 30px;width:250px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .song .name{float: right;}
</style>