<template>
    <div>
        <div class="nav allcenter">
            <router-link class="routerlink" tag='li' to="/recommend/rec">推荐</router-link>
            <router-link class="routerlink" tag='li' to="/recommend/leaderboard">MV</router-link>
            <router-link class="routerlink" tag='li' to="/recommend/songlist">排行榜</router-link>
            <router-link class="routerlink" tag='li' to="/recommend/singer">歌手</router-link>
            <router-link class="routerlink" tag='li' to="/recommend/newsong">热门电台</router-link>
        </div>
        <!-- <keep-alive> -->
            <router-view class="router-view" />
        <!-- </keep-alive> -->
        <!-- <router-view name="singerDetails"></router-view> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            recommend : {},
            w : 0,
            h : 0
        };
    },
    name: "recommend",
    mounted () {
        let h=window.innerHeight
        let w=window.innerWidth
        this.api()
        this.open()
        console.log(this.recommend);
    },
    methods : {
        api() {
            var recommend=window.localStorage.getItem('recommend')
            if(recommend){
                this.recommend=JSON.parse(recommend) 
                console.log('本地存储 recommend')
            }else{
                this.axios.get("https://autumnfish.cn/personalized/newsong")
                    .then(response => {
                    const result = response.data;
                    if (result.code == 200) {
                        this.recommend = result.result;
                        window.localStorage.setItem("recommend", JSON.stringify(result.result));
                        // this.headers.score = 3.6
                        console.log("recommend请求成功",result.result);
                    }
                    })
                    .catch(error => {
                    console.log("recommend请求失败", error);
                    });
            }
        },
        open() {
                this.$alert('可以在推荐区选首歌( 歌 单 ) 或者自己搜首歌都可以！', {
                confirmButtonText: '确定',
                });
            }
    }
};
</script>

<style lang="scss" scoped>
.nav {
min-width: 900px;
 height: 30px;
 background-color: rgb(196, 49, 49);
}
.routerlink{
    border-radius: 9px;
    margin-right: 40px;
    cursor: pointer;
    list-style: none;
    font-size: 13px;
    line-height: 20px;
    color: aliceblue;
    height: 20px;
    padding: 0 20px;
    &.router-link-active {
        background-color: brown;
        }
}
.f-white{color: aliceblue;}
.allcenter{display: flex;justify-content: center;align-items: center;}
.routerlink:hover{
  // background-color: black;
  background-color: brown;
}
.router-view{min-width: 900px;}
</style>