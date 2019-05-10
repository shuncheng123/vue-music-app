<template>
  <div id="singer">
    <heads actionMarks="歌手"></heads>
    <div class="singerConten" ref="singerContenEl">
      <!-- style="transform: translateY(0rem);" -->
      <div class="singer" ref="singerEl"  >
        <ul v-for="(item, index) in singerList" :key="index" :data-count="index">
          <h4>{{ item.title | titleChange }}</h4>
          <li v-for="(gingerName, i) in item.singer" :key="i">
            <div>
              <img v-bind:src="gingerName.img1v1Url" alt="" />
            </div>
            <p>{{ gingerName.name }}</p>
          </li>
        </ul>
      </div>
      <div class="list-shortcut">
        <ul>
          <li v-for="(item, index) in shortcutList" @click="shortcutAisle(index)"  :class="shortcutActive == index?'active':''" :key="index">{{ item | letterChange }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import pinyin from "js-pinyin";

import heads from "../common/head";
import utils from "../api/utils";

export default {
  data() {
    return {
      singerList: [],// 歌手列表
      shortcutList: [],// 字母列表
      shortcutActive: 0,
    };
  },
  mounted() {
    this.init();

    // 错误：singerEl[0] == undefined 下文可以获取
    // var singerEl = this.$refs.singerEl.children;
    // var liElHeight = singerEl[0].lastElementChild.offsetHeight;
    this.$refs.singerContenEl.addEventListener('scroll',utils.throttle(this.moveSingerList,300));
  },
  components: {
    heads
  },
  methods: {
    init() {
      new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/toplist/artist?limit=10") // 热门歌手
          .then(response => {
            let list = response.data.list.artists.slice(0, 10);
            resolve(list);
          })
          .catch(error => {
            reject(error);
          });
      }).then(value => {
        axios.get("http://localhost:3000/top/artists?limit=100") // 歌手
          .then(response => {

            let singerArrs = [];// 未排序得歌手总数组

            let list = {};// 未排序
            let newlist = {};// 已排序
            
            // 102条数据
            let artists = response.data.artists;
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
          .catch(error => {
            console.log("错误:" + error);
          });
      });
    },
    
    shortcutAisle(index){

      //根据index下标，获取DIV下对应的UL元素距离顶部的高度H;用H减去头部的高度等于DIV往Y轴挪移的高度；
      //this.shortcutActive 赋值 index下标；
      //
      // this.shortcutActive = index;
      var singerContenEl = this.$refs.singerContenEl;
      var singerEl = this.$refs.singerEl.children;
      var ulElTop = singerEl[index].getBoundingClientRect().top;
      console.log(singerEl[3].getBoundingClientRect().top);

      console.log("距离顶部的高度："+ulElTop,index);
      var headHieght = this.$refs.singerContenEl.getBoundingClientRect().top;

      // var ulElHeight = singerEl[index].offsetHeight;
      // console.log("当前Ul元素的高度："+ulElHeight);
      console.log(typeof headHieght,headHieght);
      console.log(typeof ulElTop,ulElTop);


      this.$refs.singerEl.style.color = '#000000'
      // var f = (headHieght-ulElTop)*2/100;
      // console.log(f);
      singerContenEl.scrollTo(0, ulElTop-headHieght);
      // this.$refs.singerEl.style.transform = 'translateY('+f+'rem)';

    },
    
    moveSingerList(){
        console.log('我进来了');
        var singerEl = this.$refs.singerEl.children;
        var liElHeight = singerEl[0].lastElementChild.offsetHeight;
        var headEl = this.$refs.singerContenEl.getBoundingClientRect().top + liElHeight;// 头部高度

        for(let i = 0; i< singerEl.length; i++){
            if(singerEl[i].getBoundingClientRect().top < headEl && singerEl[i+1].getBoundingClientRect().top > headEl){
            // console.log(singerEl[i].getBoundingClientRect().top);
            // console.log(singerEl[i]);
              var count = singerEl[i].dataset.count;
              this.shortcutActive = count;
            }
            
        }
    }
  },
  filters: {
      titleChange(value){
        return value == 're'? '热门': value;
      },
      letterChange(value){
        return value == 're'? '热': value;
      }
  }
};
</script>

<style lang="scss" scoped>
#singer {

  .singerConten {
    position: relative;
    overflow: scroll;
    height: calc(13.34rem - 1.6rem);

    .singer {
        // transform: translateY(0rem);
        font-size: 0.2rem;
        color: red;

      ul {
        padding-left: 0.1rem;
        h4 {
          background: #d9dcdc;
          height: 0.4rem;
          line-height: 0.4rem;
          padding-left: 0.1rem;
          color: #fbfbfb;
          margin-left: -0.1rem;
        }
        li {
          display: flex;
          font-size: 0;
          padding: 0.1rem 0;
          border-bottom: 0.02rem solid #e2e2e2;

          img {
            width: 0.9rem;
          }
          p {
            margin-left: 0.35rem;
            font-size: 0.2rem;
            line-height: 0.9rem;
          }
        }
        li:last-child {
          border-bottom: 0rem;
        }
      }
    }

    .list-shortcut {
        display: flex;
        position: fixed;
        right: 0;
        top: 1.6rem;
        bottom: 0;
        align-items: center;

      ul {
        font-size: 0.16rem;
        text-align: center;
      }
      li{
        padding: 0.05rem;
        &.active {
          color: red;
        }
      }
    }
  }
}
</style>
