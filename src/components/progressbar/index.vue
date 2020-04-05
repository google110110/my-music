<template>
    <div>
        <div id="wrapper">
            <div class="loader-container run" :style="'width: '+w+'px'">
                <div class="meter" :style="'width: '+run+'px'"></div>
                <span class="runner" :style="'width: '+(w-run)+'px'"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        name:'progressbar',
        props:['w','run'],
    }
</script>

<style lang="scss" scoped>
.loader-container {
  height: 6px;
  display: flex;
  border-radius: 3px;
//   overflow: hidden;
  background-color: white;
}
.run .runner {
  float: right;
  height: 6px;
  right: 0;
  border-radius: 4px;
}
.meter {
    position: relative;
    background-color: rgb(147, 171, 241);
    height: 6px;
    float: left;
    border-radius: 3px;
}
.meter::after{
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    position: absolute;
    background-color: rgb(226, 223, 223);
    right: 0;
    top: -4px;
}
</style>