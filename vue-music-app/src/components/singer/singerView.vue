<template>
  <div id="singer">
    <heads actionMarks="歌手"></heads>
    <singer-list :singerList="singerList" :shortcutList="shortcutList" @enter-singer="enterSingerList"></singer-list>
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
import singerList from "./singerList"




export default {
  data() {
    return {
      singerList: [],// 歌手列表
      shortcutList: [],// 字母列表
    };
  },
  mounted() {
    
    this.init();
  },
  components: {
    heads,
    singerList
  },
  methods: {
    init() {
      new Promise((resolve, reject) => {

        utils.sendRequest('http://localhost:3000/toplist/artist?limit=10', 'get', (response) => {
            let list = response.list.artists.slice(0, 10);
            resolve(list);
          })
      }).then(value => {
        utils.sendRequest('http://localhost:3000/top/artists?limit=100', 'get', (response => {
            let singerArrs = [];// 未排序得歌手总数组

            let list = {};// 未排序
            let newlist = {};// 已排序
            
            // 102条数据
            let artists = response.artists;
            artists = utils.unique(artists.concat(value), "id"); // 数组对象去重


            artists.forEach(element => {
              let pyinStr = pinyin.getFullChars(element.name).slice(0, 1);
              if (list[pyinStr] === undefined) {
                list[pyinStr] = [];
              }
              list[pyinStr].push(element);
            });


            //排序对象里的字母属性：
            let letter = Object.keys(list).sort((a, b) => {
              return a.charCodeAt() - b.charCodeAt();
            });

            //将热榜歌手插入在最前面
            newlist["re"] = value;
            //排序：根据字母顺序依次赋值给newlist
            for (let i in letter) {
              newlist[letter[i]] = list[letter[i]];
            }

            //添加属性：将已排序完成的数据newlist,添加新属性
            for(let item in newlist){
              var obj = {};
              obj['title'] = item;
              obj['singer'] = newlist[item];
              singerArrs.push(obj)
            }
            this.singerList = singerArrs;
            
            var shortcutArr = Object.keys(newlist);
            this.shortcutList = shortcutArr;
          })
        )
      });
    },
    enterSingerList(singerInfo){
        this.$router.push({name: 'singerDetails',params: {id: singerInfo.id, singerInfo}})
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
