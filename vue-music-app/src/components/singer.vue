<template>
  <div id="singer">
    <heads actionMarks="歌手"></heads>
    <div class="singerConten" ref="singerContenEl">
      <div class="singer" ref="singerEl"  >
        <ul v-for="(item, index) in singerList" :key="index" :data-count="index">
          <h4>{{ item.title | titleChange }}</h4>
          <li v-for="(gingerName, i) in item.singer" :key="i">
            <div>
              <img v-lazy="gingerName.img1v1Url" lazy="loading loaded" alt="" />
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
    this.$refs.singerContenEl.addEventListener('scroll',utils.throttle(this.moveSingerList,200));
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
    // 右侧“快捷导航”点击事件
    shortcutAisle(index){

      var singerContenEl = this.$refs.singerContenEl;
      var singerEl = this.$refs.singerEl.children;
      var ulElTop = singerEl[index].offsetTop;

      singerContenEl.scrollTo(0, ulElTop);
      console.log(this.$refs.singerContenEl.scrollTop);
      // 修改：这里存在一个很大的问题,点击字母，滚动条定位到对应位置，同时会触发滚动条事件。随之进入一次没有必要的循环
    },
    
    // 触发Div滚动事件，
    moveSingerList(){
        var singerEl = this.$refs.singerEl.children;
        var liElHeight = singerEl[0].lastElementChild.offsetHeight;
        var headEl = this.$refs.singerContenEl.offsetTop + liElHeight;// 头部高度
        for(let i = 0; i< singerEl.length; i++){
            // if(singerEl[i].getBoundingClientRect().top < headEl && singerEl[i+1].getBoundingClientRect().top > headEl){
            // }
            if(this.$refs.singerContenEl.scrollTop + liElHeight < singerEl[i].offsetTop + singerEl[i].offsetHeight){
                var count = singerEl[i].dataset.count;
                this.shortcutActive = count;
                return ;
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
        font-size: 0.2rem;

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
            background-size: 100%;
          }
          
          img[lazy=loading]{
                background-image: url('../../public/img/default.png');
                background-size: 100%;
            }
          img[lazy=loaded]{
              background-image: url('../../public/img/default.png');
              background-size: 100%;
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
