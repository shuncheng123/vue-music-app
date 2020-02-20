<template>
  <div id="singer" ref="singerEl" @scroll="moveSingerList">

      <div class="singerConten content" ref="singerContenEl" >
          <ul :data-count="0">
            <h4>热门</h4>
            <li v-for="(item, index) in hotSingerList"   @click="enterSinger(item)" :key="index">
              <div>
                <img v-lazy="item.img1v1Url" lazy="loading loaded" alt="" />
              </div>
              <p>{{ item.name }}</p>
            </li>
          </ul>
          <ul v-for="(item, index) in singerList" :key="index" :data-count="index+1">
            <h4>{{ item.title }}</h4>
            <li v-for="(ginger, i) in item.singer" @click="enterSinger(ginger)" :key="i">
              
              <div>
                <img v-lazy="ginger.img1v1Url" lazy="loading loaded" alt="" />
              </div>
              <p>{{ ginger.name }}</p>
            </li>
          </ul>
      </div>
      <div class="list-shortcut">
        <ul>
          <li v-for="(item, index) in shortcutList" @click="shortcutAisle(index)"  :class="shortcutActive == index?'active':''" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
import utils from "../../api/utils"


export default {
  data() {
    return {
      shortcutActive: 0,
      timeoutKey: null,
      listTopArr: [], //歌手列表ul距离顶部距离的集合
    };
  },
  props:{
      singerList:{
          types: Array,
          default: ()=>{
             return []
          },
      },
      shortcutList:{
          types: Array,
          default: ()=>{
             return []
          },
      },
      hotSingerList:{
          types: Array,
          default: ()=>{
             return []
          },
      },
      
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 初始化Ul元素距离顶部的距离
      var listEl =  this.$refs.singerContenEl.childNodes;
      for (let index = 0; index < listEl.length; index++) {
        this.listTopArr.push(listEl[index].offsetTop-80);
      }
    },

    // 右侧“快捷导航”点击事件
    shortcutAisle(index){
      console.log('点击字母'+index);
      this.shortcutActive = index;
      // 2.获取对应下标的Dom元素距离顶部的距离(-80后理解为滚动条距离顶部的距离)
      var offsetHeight = this.listTopArr[index];
      // 3.使整个歌手列表集合向上挪移 offsetHeight 高度
      this.$refs.singerEl.scrollTop = offsetHeight;
      // 优化：每次点击都获取元素,较影响效率
      // 修改：这里存在一个很大的问题,点击字母，滚动条定位到对应位置，同时会触发滚动条事件。随之进入一次没有必要的循环
    },
    
    // 触发Div滚动事件，
    moveSingerList(){
      this.timeoutKey && clearTimeout(this.timeoutKey);
      this.timeoutKey = setTimeout(function(){
        for (let index = 0; index < this.listTopArr.length; index++) {
          if(this.$refs.singerEl.scrollTop < this.listTopArr[index]){
              this.shortcutActive = index-1;
              break;
          }
        }
      }.bind(this),100);
    },

    enterSinger(singerInfo){
      this.$emit('enter-singer',singerInfo);
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


  // .wrapper{
  //   overflow: hidden;
  //   height: calc(13.34rem - 1.6rem);
  // }
  #singer{
    overflow: scroll;
    height: calc(13.34rem - 1.6rem);
    font-size: 0.2rem;

  }
  .singerConten {
    

    // .singer {
        // font-size: 0.2rem;


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
                background-image: url('../../../public/img/default.png');
                background-size: 100%;
            }
          img[lazy=loaded]{
              background-image: url('../../../public/img/default.png');
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
  // }

  .list-shortcut {
        position: fixed;
        width: 0.40rem;
        right: 0.10rem;
        top: 1.6rem;
        bottom: 0;
        

      ul {
        position: absolute;
        width: 100%;
        top: 50%;
        right: 0rem;
        transform: translateY(-50%);
        font-size: 0.26rem;
        text-align: center;
      }
      li{
        padding: 0.05rem;
        &.active {
          color: red;
        }
      }
    }
</style>
