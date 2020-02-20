<template>
  <div id="singer">
    <heads :actionMarks="page" @clickEvent="clickCbk"></heads>
    <singer-lists v-if="singerList.length > 1" :singerList="singerList" :shortcutList="shortcutList" :hotSingerList="hotSingerList" @enter-singer="enterSingerList"></singer-lists>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import axios from "axios"
import utils from "../../api/utils"
import pinyin from "js-pinyin"

import heads from "../../common/head"
import singerLists from "./singerList"




export default {
  data() {
    return {
      page: '歌手',
      hotSingerList: [],// 热门歌手
      singerList: [],// 歌手列表
      shortcutList: [],// 字母列表
    };
  },
  created(){
    this.init();
  },
  
  components: {
    heads,
    singerLists
  },
  methods: {
    init() {
      new Promise((resolve, reject) => {

        //热门歌手
        utils.sendRequest('http://localhost:3000/top/artists?limit=10', 'get', (response) => {
            this.hotSingerList = response.artists;
            resolve(this.hotSingerList);
          })
      }).then(value => {

        //歌手榜
        utils.sendRequest('http://localhost:3000/toplist/artist', 'get', (response => {

            let list = {};// 未排序
            let newlist = {};// 已排序
            
            // 100条数据
            let artists = response.list.artists;
            artists = utils.uniques(value, artists, "id"); // 数组对象去重 


            artists.forEach(element => {
              let pyinStr = pinyin.getFullChars(element.name).slice(0, 1).toUpperCase();
              var Asc = pyinStr.charCodeAt();
              if(!(Asc >= 65 && Asc <= 90)){ // 判断是否为特殊姓名
                pyinStr = "#";
              }
              if (!list[pyinStr]) { 
                list[pyinStr] = [];
              }
              list[pyinStr].push(element);

            }); 
            //排序对象里的字母属性：
            let letter = Object.keys(list).sort((a, b) => {
              return a.charCodeAt() - b.charCodeAt();
            }); 
            if(letter[0] == "#"){
              letter.shift();
              letter.push("#");
            }

            // 将热榜歌手插入在最前面
            // newlist["re"] = value;
            // 排序：根据字母顺序依次赋值给newlist
            for (let i in letter) {
              newlist[letter[i]] = list[letter[i]];
            }


            // 添加属性：将已排序完成的数据newlist,添加新属性
            for(let item in newlist){
              var obj = {};
              obj['title'] = item;
              obj['singer'] = newlist[item];
              this.singerList.push(obj);
            }
            this.shortcutList = Object.keys(newlist);
            this.shortcutList.unshift('热');

          })
        )
      });
    },
    enterSingerList(singerInfo){
        this.$router.push({name: 'singerDetails',params: {id: singerInfo.id, singerInfo}})
    },
    clickCbk(site){
      this.$router.push({ name: site});
    }

  },

};
</script>

<style lang="scss" scoped>

  //过渡动画
  .slide-enter-active,.slide-leave-active{
      transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
      transform: translate3d(100%,0,0)
  }

</style>
