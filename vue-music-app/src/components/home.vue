<template>
  <div id="page">
    <div class="head">

      <div class="title">
        <i class="iconfont icon-cebianlan"></i>
        <p>music</p>
        <i class="iconfont icon-sousuo"></i>
      </div>
      
      <ul class="action">
        <li v-for="(item,index) in action" @click="action_atv(index)" :key="index">
          <span  v-bind:class="{active_Span: index == actionMrka }">{{item}}</span>
        </li>
      </ul>
    </div>

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
       
    </div>
  </div>
</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';
import axios from 'axios'


export default {
  name: 'home',// ???
  data(){
    return{
      action: ['推荐','排行','歌手'],
      actionMrka: 1,
      banners: [],


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
    swiperSlide
  },
  methods: {
    action_atv(index){ // 点击按钮切换下标
      this.actionMrka = index;
    }
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // you can use current swiper instance object to do something(swiper methods)
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)

      axios.get('http://localhost:3000/banner')
      .then((response) => {
        this.banners = response.data.banners;
        console.log(this.banners);
      })
      .catch((error) => {
        console.log("错误:"+error);
      })

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
    color: #f1f1f1;    
    font-size: 0.3rem;
    .head{
      height: 1.6rem;
      background: #d44538;

      .title{
        display: flex;
        justify-content: space-between;
        padding: 0 .20rem;
        height: .80rem;
        line-height: .80rem;
        font-size: .24rem;

        i{
          display: inline-block;
          padding: 0 .10rem;
          font-size: .35rem;
        }
        p{
          font-size: 0.30rem;
          letter-spacing: .05rem;
          font-weight: 700;
          color: #f1f1f1;

        }
      }

      .action{
        display: flex;
        height: .80rem;
        line-height: 0.80rem;

        li{
          flex: 1;
          text-align: center;

          span{
            padding: .03rem 0;
            color: #f1f1f1;
            font-size: .28rem;
          }

          .active_Span{
            border-bottom: .03rem solid #fff;
            color: #fff;
            font-weight: bold;
          }
        }
      }
      
    }

    // 推荐 
    .recommend{

      .redBg{
        background: #d44538;
        height: 2.7rem;
        width: 100%;
        position: absolute;
      }
      .bannerSty{
        padding: 0 0.15rem;
      }


      .swiper-container {
          // height: 3.3rem;

          .swiper-wrapper{
            // height: 3.3rem;

            img{
              width: 100%;
              height: 3.3rem;
            }
        }
      }
      
    }
  }
</style>
