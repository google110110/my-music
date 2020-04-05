<template>
    <div>
        <keep-alive>
            <router-view :getrout="getrout" />
        </keep-alive>
    </div>
</template>

<script>
    export default {
        data(){
            return{
            }
        },
        name: "songle",
        methods:{
            getrout(url){
                this.rout = !this.rout
                console.log(this.rout);
                this.$router.push(url)
            }
        }
    }
</script>

<style scoped>

</style>