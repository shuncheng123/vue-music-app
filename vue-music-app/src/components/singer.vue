<template>
  <div id="singer">
    <heads actionMarks="歌手"></heads>
    <div class="singerConten">
      <div ref="singerEl" class="singer" >
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
          <li v-for="(item, index) in shortcutList"  :ref="'shortcut'+index" :key="index">{{ item | letterChange }}</li>
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
    };
  },
  mounted() {

    this.init();
    this.$refs.singerEl.addEventListener('scroll',this.throttle(this.moveSingerList,500));
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
    throttle(method, delay){
        let last = 0; //采用闭包来封装全局功能,这个闭包属性很关键(如果不采用闭包属性,那么last属性就必须定义在组件内)
        return function(){
            let now = new Date();
            if(last == 0){ //滚动条滚动delay,不触发执行
                last = now;
            }
            if(now - last > delay){
                method.apply(this,arguments);
                last = now;
            }
        }
    },
    
    moveSingerList(){
        var scrollTop =  this.$refs.singerEl.scrollTop;
        var singerEl = this.$refs.singerEl.children;
        var headEl = this.$refs.singerEl.getBoundingClientRect().top;// 头部高度
        // console.log(headEl);

        for(let i = 0; i< singerEl.length; i++){
                // console.log(singerEl[i].getBoundingClientRect().top)
            if(singerEl[i].getBoundingClientRect().top > 0 && singerEl[i].getBoundingClientRect().top < 100){
                console.log(singerEl[i])
            }
            // if(singerEl[i].getBoundingClientRect().top < headEl && singerEl[i+1].getBoundingClientRect().top > headEl){
            //     var aaa = singerEl[i].dataset.count;
            //     console.log("shortcut"+aaa)
            //     this.$ref["shortcut"+aaa].addClass('active');
            // }
            
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
    

    .singer {
        overflow: scroll;
        height: calc(13.34rem - 1.6rem);
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
        align-items: center;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;

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
