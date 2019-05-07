<template>
  <div id="page">
    
    <heads actionMarks="推荐"></heads>
    <div class="recommend">
      <div class="redBg"></div>
      <div class="bannerSty">
        <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
        <!-- slides -->
          <swiper-slide v-for="(item,index) in banners" :key="index"><img v-bind:src="item.imageUrl" alt=""></swiper-slide>
          <div class="swiper-pagination"></div>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
          
        </swiper>
      </div>
      <h3>推荐歌单</h3>
        
        <ul class="recommendMusic">
          <li v-for="(item,index) in recommendList" :key="index">
            <div>
              <img v-bind:src="item.picUrl" alt="">
              <div class="musicCount">
                <i class="iconfont icon-erji"></i>
                <span>&nbsp;&nbsp;{{item.playCount | conversion}}万</span>
              </div>
            </div>
            <p>{{item.name}}</p>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';
import axios from 'axios'

import heads from '../common/head'


export default {
  name: 'home',// ???
  data(){
    return{
      actionMrka: 1,
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
    heads: heads,
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
    action_atv(index){ // 点击按钮切换下标
      this.actionMrka = index;
    }
  },
  filters: {
      conversion(count){
        return count.toString().slice(0,2);
      }
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      
  },
  mounted() {
    
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)

    this.init();
    

  }
  
  // mounted(): {
  //     var mySwiper = new Swiper('.swiper-container', {})
  // }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >

  #page{
    width: 7.50rem;
    // font-size: 0.3rem;
    

    // 推荐 
    .recommend{
      overflow: scroll;
      height: calc(13.34rem - 1.60rem);
      position: relative;
      .redBg{
        background: #d44538;
        height: 2.7rem;
        width: 100%;
        position: absolute;
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
          height: 3.35rem;
          padding-right: .14rem;

          > div{
            position: relative;
            margin-bottom: 0.15rem;

            img{
              width: 100%;
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
          }
        }
        li:nth-child(3n){
          padding-right: 0; 
        }

        
    }

          
      
    }
  }
</style>
