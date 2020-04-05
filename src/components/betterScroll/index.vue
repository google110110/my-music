<template>
    <div ref="betterScroll" class="betterScroll" :style="{'max-height':+maxHeight+'px'}">
        <slot/>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name:'betterScroll',
        props:{
            maxHeight:{
                type:[String, Number],
                default:300
            },
            scrollX:{
                type:Boolean,
                default:false
            },
            // handerScrollTo:{
            //     type:Function,
            //     default: function(){}
            // },
            handerScroll:{
                type:Function,
                default: function(){}
            },
            handerTouchEnd:{
                type:Function,
                default: function(){}
            }
        },
        mounted(){
            this.scroll =new BScroll(this.$refs.betterScroll,{
                scrollX:this.scrollX,
                tap:true,
                probeType:1,
                // click:true
            })
            this.scroll.on('scroll',(pos)=>{
                this.handerScroll(pos)
            })
            this.scroll.on('touchEnd',(pos)=>{
                this.handerTouchEnd(pos)
            })
            // this.toScrollTo()
        },
        methods:{
            toScrollTo(y){
                this.scroll.scrollTo(0,y,1000)
            }
        }
    }
</script>
<style lang="scss" scoped>
.betterScroll{overflow: hidden;width: 100%;}//
</style>