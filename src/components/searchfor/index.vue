<template>
    <div class="searchInput">
        <!-- <input type="text" name="fname" class="text"/> -->
        <div class="re">
            <el-autocomplete ref="search" @select="handleSelect" class="inline-input" v-model="state" :fetch-suggestions="SearchAsync" size="mini" placeholder="请输入歌曲名字" prefix-icon="el-icon-search"></el-autocomplete>
            <el-button @click="goSearch(true)" type="info" size="mini" slot="append" icon="el-icon-search"></el-button>
        </div>
    </div>
</template>

<script>
import api from "@/until/api.js"
    export default {
        data(){
            return{
                restaurants: [],
                state: '',
                timeout:  null
            }
        },
        name:'searchfor',
        components: {
        },
        mounted() {
        },
         methods: {
             videodata(name) {
                api.api(`/search/suggest?keywords=${name}`, `search${name}`).then(data => {
                    if (data.code == 200) {
                        
                    }
                })
            },
             SearchAsync(name, cb) {
                 console.log('1');
                 if(name){
                     api.api(`/search/suggest?keywords=${name}`, `search${name}`).then(data => {
                        if (data.code == 200) {
                            var d = data.result.songs
                            console.log(data.result);
                            if(d){
                                var search = []
                                for(let i in d){
                                    search[i] = {
                                        id:d[i].id,
                                        value:d[i].name + '( ' + d[i].artists[0].name + ' )',
                                        name:d[i].name,
                                        message:d[i]
                                    }
                                   if(i  == d.length-1){
                                       console.log('----',search,d[i].name);
                                       cb(search)
                                       return 
                                   }
                            }
                            }
                        }
                    })
                 }else{
                    //  api.api(`/search/hot`,`/search/hot`).then(data => {
                    api.api(`/search/hot/detail`,`/search/hot/detail`).then(data => {
                        if (data.code == 200) {
                            var d = data.data
                            console.log(d);
                            var search = [
                                {value:'大家都在搜的  ',name:''}
                            ]
                            for(let i in d){
                                   search[parseInt(i) +1] = {
                                       value:(parseInt(i)+1) + '.' + d[i].searchWord,
                                       name:d[i].searchWord,
                                       author:d[i]
                                   }
                                   if(i == d.length-1){
                                       cb(search)
                                       return 
                                   }
                            }
                        }
                    })
                 }
             },
             createStateFilter(queryString) {
                 console.log('1');
                 api.api(`/search/suggest?keywords=${name}`, `search${name}`).then(data => {
                    if (data.code == 200) {
                        console.log(data);
                    }
                })
             },
             handleSelect(item) {
                this.goSearch(false,item.name)
            },
            goSearch(flag,name){
                var value = ''
                if(flag){
                    value = this.$refs.search.value 
                }else{
                    value = name
                }
                console.log(value);
                var routerJump =this.$router.resolve({
                        path: '/my',
                        query: {
                            value: value
                        }
                    })
                window.open(routerJump.href, '_blank')
            }
         }
    }
</script>

<style lang="scss" scoped>
.text{outline:none;background-color: none;}
.el-input{height: 30px;border-radius: 30px !important;}
.inline-input{border-radius: 30px !important;}
// .searchInput{position: relative;}
// .re{position: absolute;width: 200px;}
</style>