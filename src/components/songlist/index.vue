<template>
  <div class="warper">
    <div class="centent">
      <div class="left" v-if="songslist">
        <div
          v-for="(item,index) in songslist"
          :key="index"
          class="list"
          @click="getid(item)"
          :data-id="item.id"
        >
          <img :src="item.coverImgUrl" alt />
          <div class="cont">
            <span class="name f-red">{{item.name}}</span>
            <span>{{item.updateFrequency}}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- <router-view name="songs"/> -->
        <!-- <songs :id="id"></songs> -->
        <songs :newdata="newdata" :id="id"></songs>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/until/api.js";
import collection from "@/components/collection";
import songs from "@/components/songs";
import Vue from "vue";
export default {
  data() {
    return {
      songslist: {},
      // id:'云音乐飙升榜'
      newdata: {},
      id:19723756,
      uid: {
        0: "云音乐新歌榜",
        1: "云音乐热歌榜",
        2: "网易原创歌曲榜",
        3: "云音乐飙升榜",
        4: "云音乐电音榜",
        5: "UK排行榜周榜",
        6: "美国Billboard周榜",
        7: "KTV嗨榜",
        8: "iTunes榜",
        9: "Hit FM Top榜",
        10: "日本Oricon周榜",
        11: "韩国Melon排行榜周榜",
        12: "韩国Mnet排行榜周榜",
        13: "韩国Melon原声周榜",
        14: "中国TOP排行榜(港台榜)",
        15: "中国TOP排行榜(内地榜)",
        16: "香港电台中文歌曲龙虎榜",
        17: "华语金曲榜",
        18: "中国嘻哈榜",
        19: "法国 NRJ EuroHot 30周榜",
        20: "台湾Hito排行榜",
        21: "Beatport全球电子舞曲榜",
        22: "云音乐ACG音乐榜",
        23: "云音乐说唱榜",
        24: "云音乐古典音乐榜",
        25: "云音乐电音榜",
        26: "抖音排行榜",
        27: "新声榜",
        28: "云音乐韩语榜",
        29: "英国Q杂志中文版周榜",
        30: "电竞音乐榜",
        31: "云音乐欧美热歌榜",
        32: "云音乐欧美新歌榜",
        33: "说唱TOP榜"
      }
    };
  },
  name: "songlist",
  components: {
    collection,
    songs
  },
  mounted() {
    this.toplist();
    this.getdata(3);
  },
  methods: {
    toplist() {
      api.api("/toplist", "toplist").then(data => {
        if (data.code == 200) {
          this.songslist = data.list;
          console.log(data.list);
        }
      });
    },
    getid(item) {
      var i = this.getuid_id(item.name);
      this.id = item.id
      console.log(i);
      this.getdata(i);
    },
    getdata(id) {
      api.api(`/top/list?idx=${id}`, `list${id}`).then(data => {
        this.newdata = data.playlist;
        console.log('this.newdata',this.newdata);
      });
    },
    getuid_id(id) {
      var uid = this.uid;
      for (let i in uid) {
        if (uid[i] == id) {
          return i;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.warper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.warper .centent {
  display: flex;
  font-size: 10px;
  min-width: 1000px;
}
.warper .centent .right {
  float: right;
  width: 75%;
  border: 1px solid #ccc;
}
.warper .centent .left {
  border-left: 1px solid #ccc;
  float: left;
  width: 25%;
  padding: 0 10px;
  box-sizing: border-box;
}
.warper .centent .left .list {
  cursor: pointer;
  width: 100%;
  height: 50px;
  display: flex;
  padding: 5px;
}
.warper .centent .left .list img {
  width: 50px;
  height: 50px;
}
.warper .centent .left .list .cont {
  margin-left: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.warper .centent .left .list .name {
  font-size: 12px;
  margin-bottom: 10px;
}
.warper .centent .left :hover {
  background-color: rgb(199, 197, 197);
}
.f-red {
  color: red;
}
</style>