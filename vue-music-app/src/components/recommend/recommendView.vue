<template>
  <div id="page" >
    <heads actionMarks="推荐" ></heads>
    <recommend-list :banners="banners" :recommendList="recommendList"></recommend-list>
    <transition name="slide">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import axios from 'axios';
import heads from '../../common/head'

import recommendList from './recommendList'

export default {
  name: 'home',// ???
  data(){
    return{
      banners: [], //轮播图
      recommendList: [], //推荐歌单
    }
  },
  components: {
    heads,
    recommendList,
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
    
  },
  
  mounted() {
    this.init();
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
  }
</style>
