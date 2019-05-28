<template>
  <div id="page" >
    <heads actionMarks="推荐" ></heads>
    <div class="recommend" ref="wrapper">
      <div class="content">

      <div class="redBg"></div>
        
      <div class="bannerSty">
        <swiper :options="swiperOption"  ref="mySwiper">
          <swiper-slide v-for="(item,index) in banners" :key="index"><img v-bind:src="item.imageUrl" alt=""></swiper-slide>
          <div class="swiper-pagination"></div>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
      <h3>推荐歌单</h3>
        
      <ul class="recommendMusic">
        <li v-for="(item,index) in recommendList" @click="enetrSong(item)" :key="index">
          <div>
            <img v-lazy="item.picUrl" lazy="loading loaded"   alt="">
            <div class="musicCount">
              <i class="iconfont icon-erji"></i>
              <span>&nbsp;&nbsp;{{item.playCount | conversion}}</span>
            </div>
          </div>
          <p>{{item.name}}</p>
        </li>
      </ul>
      </div>
      
    </div>

    <transition name="slide">
        <router-view></router-view>
    </transition>

  </div>
</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';
import axios from 'axios';
import Bscroll from 'better-scroll';

import heads from '../common/head'


export default {
  name: 'home',// ???
  data(){
    return{
      banners: [], //轮播图
      recommendList: [], //推荐歌单
      notNextTick: true,
      swiperOption: {
        autoplay: true,
        direction: 'horizontal',// 横屏
        paginationHide: true,// 点

        // Navigation
        onTransitionStart (swiper) {
          console.log(swiper)
        }
      // more Swiper configs and callbacks...
      // ...
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    heads,
  },
  methods: {
    init(){
      axios.get('http://localhost:3000/banner')
      .then((response) => {
        this.banners = response.data.banners;
      })
      .catch((error) => {
        console.log("错误:"+error);
      })

      axios.get('http://localhost:3000/personalized')
      .then((response) => {
        this.recommendList = response.data.result;
      })
      .catch((error) => {
        console.log("错误:"+error);
      })

      
    },
    enetrSong(data){
      this.$router.push({name: 'songDetails', params: {id: data.id,info : data}})
    },
    
  },

  filters: {
      conversion(count){
        count = count.toString().split('.')[0];
        if(count.length >= 9){
           return ((Number(count)/100000000).toFixed(1)/1) + '亿';
        }else if(count.length >= 5){
           return (Number(count)/10000).toFixed(0) + '万';
        }else{
          return count;
        }
      }
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      },
      
  },
  mounted() {
    this.init();

    this.scroll = new Bscroll(this.$refs.wrapper);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >


  //过渡动画
  .slide-enter-active,.slide-leave-active{
      transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
      transform: translate3d(100%,0,0)
  }

  #page{
    width: 7.50rem;
    // font-size: 0.3rem;
    

    // 推荐 
    .recommend{
      // overflow: scroll;
      height: calc(13.34rem - 1.60rem);
      position: relative;
      .redBg{
        width: 100%;
        position: absolute;
        top: -5.3rem;
        height: 8rem;
        background: #d44538;

      }
      .bannerSty{
        padding: 0 0.15rem;
        font-size: 0;

        .swiper-container{
          border-radius: .10rem;
        }

        img{
            width: 100%;
            height: 3.32rem;
          }
      }

      h3{
          height: 1.3rem;
          line-height: 1.3rem;
          padding: 0 0.15rem;
          font-size: 0.28rem;
          color: #262626;
        }

      .recommendMusic{
        color: #000;
        padding: 0 .10rem;
        font-size: 0;
        overflow: hidden;

        li{
          float: left;
          width: 2.34rem;
          padding-right: .14rem;

          > div{
            position: relative;
            margin-bottom: 0.15rem;

            img{
              width: 100%;
            }
            img[lazy=loading]{
                background-image: url('../../public/img/default.png');
                background-size: 100%;
            }
            img[lazy=loaded]{
                background-image: url('../../public/img/default.png');
                background-size: 100%;
            }
            .musicCount{
              position: absolute;
              top: 0;
              right: 0;
              color: #fff;
              padding: 0.10rem;
              font-size: 0.22rem;

            }
          } 
          p{
            font-size: .22rem;
            color: #323233;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            height: 0.70rem;
            margin-bottom: 0.10rem;
          }
        }
        li:nth-child(3n){
          padding-right: 0; 
        }

        
    }

          
      
    }
  }
</style>
